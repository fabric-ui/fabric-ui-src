import PropTypes from "prop-types";
import styles from '../styles/Apps.module.css'
import ToolTip from "../../../../../feedback/tooltip/ToolTip";
import React from "react";
import Button from "../../../../../inputs/button/Button";

export default function App(props) {
    return (
        <Button
            variant={"outlined"}
            disabled={props.disabled} className={styles.appButton}
            onClick={() => props.onClick()}>
            {props.icon}
            <div className={[styles.appLabel, styles.overflowEllipsis].join(' ')}>
                {props.label}
            </div>
            <ToolTip content={props.label}/>
        </Button>
    )
}
App.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.object,
    label: PropTypes.string
}
