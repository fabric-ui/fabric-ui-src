import React, {useContext} from 'react'

import PropTypes from "prop-types";
import RailContext from "./hooks/RailContext";

export default function RailActionWrapper(props) {
    const context = useContext(RailContext)
    return props.children !== null && props.children !== undefined  ? (typeof props.children === 'function' ? props.children(context) : props.children) : <></>
}

RailActionWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    styles: PropTypes.object,
    place: PropTypes.oneOf(['start', 'end']),
    group: PropTypes.string
}
