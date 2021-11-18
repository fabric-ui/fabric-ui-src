import React from 'react'
import PropTypes from "prop-types";

export default function StepperWrapper(props){
    return props.children ? props.children : <></>
}
StepperWrapper.propTypes={
    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node
}
