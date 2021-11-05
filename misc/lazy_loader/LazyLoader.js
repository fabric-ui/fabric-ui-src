import PropTypes from 'prop-types'
import {useEffect, useState} from "react";

export default function LazyLoader(props) {

    const [onRender, setOnRender] = useState(1)
    let onRenderRef = onRender
    let quantityPerPage = 0
    let elementHeight = 0
    const handleScroll = (e) => {
        if ((e.target.offsetHeight + e.target.scrollTop) >= e.target.scrollHeight) {
            setOnRender(quantityPerPage + onRenderRef)
            onRenderRef = quantityPerPage + onRenderRef
            props.scrollableRef.style.height = onRenderRef * (elementHeight * 1.5) + 'px'
        }
    }
    //
    const getQuantityPerPage = () => {
        console.log(props.dataLength)
        const heightPerElement = props.scrollableRef.firstChild.getBoundingClientRect().height
        const elements = Math.ceil(props.scrollableRef.getBoundingClientRect().height / heightPerElement) + 2

        elementHeight = heightPerElement
        setOnRender(elements)
        onRenderRef = elements
        quantityPerPage = elements

        props.scrollableRef.style.height = elements * (heightPerElement * 1.5) + 'px'

        props.scrollableRef.parentNode.addEventListener('scroll', handleScroll)
    }

    useEffect(() => {
        if (props.scrollableRef !== undefined && props.dataLength > 0 && onRender === 1)
            getQuantityPerPage()
        return () => {
            if (props.scrollableRef !== undefined)
                props.scrollableRef.parentNode.removeEventListener('scroll', handleScroll)
        }
    }, [props.dimensions, props.scrollableRef, props.dataLength])
    return (
        props.children(onRender)
    )
}

LazyLoader.propTypes = {
    dimensions: PropTypes.number,
    children: PropTypes.any,
    dataLength: PropTypes.number,
    scrollableRef: PropTypes.object,
    renderer: PropTypes.func,
    scrollOrientation: PropTypes.oneOf(['horizontal', 'vertical']),
    elementDimension: PropTypes.number
}