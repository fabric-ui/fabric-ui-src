import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import ReactDOM from "react-dom";
import Details from "./details/Details";
import Alert from "../../alert/Alert";


export default function RequestAlert(props) {
    const [open, setOpen] = useState(false)

    const ref = useRef()
    const message = useMemo(() => {
        switch (true) {
            case props.httpStatusCode >= 300:
                return `Algum erro ocorreu (${props.httpStatusCode})`
            case props.httpStatusCode < 300:
                return `Sucesso (${props.httpStatusCode})`
            default:
                return `Algum erro ocorreu (${props.httpStatusCode})`
        }
    }, [props])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!open)
                try {
                    ReactDOM.unmountComponentAtNode(ref.current?.parentNode);
                } catch (e) {
                }
        }, 5000)
        return () => {
            if (timeout)
                clearTimeout(timeout)
        }
    }, [open])
    return (
        <div ref={ref}>
            <Details
                open={open}
                handleClose={() => {
                    setOpen(false)
                }}
                data={props}
            />
            <Alert
                onClick={() => setOpen(true)}
                open={!open} variant={props.httpStatusCode < 300 ? 'success' : 'error'}
                handleClose={(forced) => {

                    if (forced)
                        ReactDOM.unmountComponentAtNode(ref.current?.parentNode);
                }}
            >
                {message}
            </Alert>

        </div>
    )
}

Alert.propTypes = {


    message: PropTypes.string,
    details: PropTypes.string,
    httpStatusCode: PropTypes.number,
    package: PropTypes.any,
    method: PropTypes.string,
    url: PropTypes.string,
}
