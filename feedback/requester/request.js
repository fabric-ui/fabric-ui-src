import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Loader from "./modules/loader/Loader";
import React from 'react'
import RequestAlert from "./modules/RequestAlert";
import axios from "axios";


export default async function Request(props) {
    const packageSent = {...props.package}
    const method = props.method.toLowerCase()
    const loader = document.createElement('div')
    document.body.appendChild(loader)
    ReactDOM.render(
        <Loader/>,
        loader
    )

    const params = {
        method: method,
        headers: props.headers,
        data: method === 'get' ? undefined : packageSent ,
        params: method !== 'get' ? undefined : packageSent,
        url: props.url
    }

    return axios(params)
        .then((r) => {
            ReactDOM.unmountComponentAtNode(loader)
            if (props.showSuccessAlert) {
                const newElement = document.createElement('div')
                document.body.appendChild(newElement)
                ReactDOM.render(
                    <RequestAlert
                        {...{
                            message: r.response.statusText,
                            details: r.data,
                            httpStatusCode: r.response.status,
                            package: packageSent,
                            method: method,
                            url: props.url
                        }}
                    />,
                    newElement
                )
            }
            return {
                data: r.data, text: r.text, status: r?.status, message: r?.statusText, ok: true
            }
        })
        .catch(r => {
            ReactDOM.unmountComponentAtNode(loader)
            const newElement = document.createElement('div')
            document.body.appendChild(newElement)
            ReactDOM.render(
                <RequestAlert
                    {...{
                        message: r.response.statusText,
                        details: r.data,
                        httpStatusCode: r.response.status,
                        package: packageSent,
                        method: method,
                        url: props.url
                    }}
                />,
                newElement
            )
            return {
                status: r?.status, message: r?.statusText, ok: false
            }
        })


}
Request.propTypes = {
    headers: PropTypes.object,
    package: PropTypes.object,
    url: PropTypes.string.isRequired,

    // credentials: PropTypes.oneOf(['default', 'include', 'same-origin', 'omit']),
    // redirect: PropTypes.oneOf(['manual', 'follow', 'error']),
    // referrerPolicy: PropTypes.oneOf(['default', 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url']),
    // mode: PropTypes.oneOf(['default', 'no-cors', 'cors', 'same-origin']),
    // cache: PropTypes.oneOf(['default', 'no-cache', 'reload', 'force-cache', 'only-if-cached']),
    method: PropTypes.oneOf(['get', 'put', 'post', 'delete', 'patch']).isRequired,

    showSuccessAlert: PropTypes.bool
}
