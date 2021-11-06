import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import styles from './styles/Tabs.module.css'

export default function Tab(props) {
    return (
        props.children
    )
}

Tab.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    group: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node
}