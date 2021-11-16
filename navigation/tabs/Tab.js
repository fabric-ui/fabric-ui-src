import PropTypes from "prop-types";
import React from "react";

export default function Tab(props) {
    return (
        props.children ? props.children : <></>
    )
}

Tab.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    styles: PropTypes.object,
    group: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node
}
