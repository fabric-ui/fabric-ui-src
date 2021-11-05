import React, {useCallback, useEffect, useReducer, useState} from "react";
import ACTIONS from "./deps/dataActions";
import dataReducer from "./deps/dataReducer";
import PropTypes from 'prop-types'
import axios from "axios";

const init = (e) => {
    return e
}
export default function useQuery(props) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const fetchParams = useCallback((page = undefined) => {
        let pack = {
            page: page !== undefined ? page : currentPage,
            quantity: props.fetchSize,
            filters: [...filters],
            sorts: [...sorts]
        }
        if (typeof props.parsePackage === 'function')
            pack = props.parsePackage(pack)

        pack.filters = JSON.stringify(pack.filters)
        pack.sorts = JSON.stringify(pack.sorts)

        return {
            method: 'GET',
            headers: {...props.headers, 'content-type': 'application/json'}, url: props.url,
            params: pack,
        }
    }, [filters, sorts, props])
    const fetchData = useCallback(
        (page = undefined) => {
            setLoading(true)
            const params = fetchParams(page)

            axios(
                params
            ).then(res => {

                dispatchData({type: ACTIONS.PUSH, payload: res.data})
                setHasMore(res.data.length > 0)
                setLoading(false)
            }).catch(() => null)
        }, [props, loading, hasMore, data])
    useEffect(() => {
        if (currentPage > 0)
            fetchData(currentPage)
    }, [currentPage])

    useEffect(() => {
        clean()
    }, [filters, sorts])

    const clean = () => {

        dispatchData({type: ACTIONS.EMPTY})
        setHasMore(false)
        setCurrentPage(0)

        fetchData(0)
    }

    return {
        data,
        filters,
        setFilters,
        sorts, setSorts,
        setCurrentPage,
        currentPage,
        hasMore,
        loading,
        clean
    }
}
useQuery.propTypes = {
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number
}
