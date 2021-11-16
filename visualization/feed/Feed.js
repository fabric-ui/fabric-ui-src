import PropTypes from "prop-types";
import styles from './styles/Feed.module.css'
import React from "react";

export default function Feed(props) {
    return (
        <div style={{width: props.width}}>
            <div className={styles.title}>
                {props.title}
                <div className={styles.titleDivider}/>
            </div>
            <div className={styles.wrapper}>
                {props.children}
            </div>
        </div>
    )
}

Feed.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    width: PropTypes.string
}