import PropTypes from 'prop-types'
import React, {useMemo, useRef, useState} from 'react'
import ReactDOM from "react-dom";
import Details from "./details/Details";
import Alert from "../../alert/Alert";


export default function RequestAlert(props) {
    const [open, setOpen] = useState(false)

    const ref = useRef()
    const message = useMemo((type) => {
        switch (true) {
            case props.data.httpStatusCode >= 300:
                return `Algum erro ocorreu (${props.data.httpStatusCode})`
            case props.data.httpStatusCode < 300:
                return `Sucesso (${props.data.httpStatusCode})`
            default:
                return `Algum erro ocorreu (${props.data.httpStatusCode})`
        }
    }, [props])


    return (
        <div ref={ref}>
            <Details
                open={open}
                handleClose={() => {
                    setOpen(false)
                }}
                data={props.data}
            />
            <Alert
                onClick={() => setOpen(true)}
                open={!open}
                handleClose={() => {
                    ReactDOM.unmountComponentAtNode(ref.current?.parentNode);
                }}
                delay={5000}
            >
                {message}
            </Alert>

        </div>
    )
}

Alert.propTypes = {

    data: PropTypes.shape({
        message: PropTypes.string,
        details: PropTypes.string,
        httpStatusCode: PropTypes.number,
        package: PropTypes.any,
        method: PropTypes.string,
        url: PropTypes.string
    }),
    type: PropTypes.oneOf(['error', 'alert', 'success']),
}
