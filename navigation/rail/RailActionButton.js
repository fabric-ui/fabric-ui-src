import React, {useContext} from 'react'

import styles from "./styles/Action.module.css";
import PropTypes from "prop-types";
import Ripple from "../../misc/ripple/Ripple";
import ToolTip from "../../feedback/tooltip/ToolTip";
import RailContext from "./hooks/RailContext";

export default function RailActionButton(props) {
    const context = useContext(RailContext)
    return (
        <span>
            <button
                onClick={props.onClick}
                disabled={props.disabled}
                className={styles.buttonWrapper}
                data-extended={JSON.stringify(context)}
                data-highlight={JSON.stringify(props.highlight)}
            >
                <div className={styles.iconWrapper}>
                <span className={styles.icon}>
                    {props.icon}
                </span>

                </div>
                <div className={styles.label}>
                    {props.label}
                </div>

                <Ripple disabled={props.disabled} opacity={.15}/>

            </button>

            <ToolTip content={props.label + (props.disabled ? ' (Disabled)' : '')} align={'middle'} justify={"end"}/>
        </span>
    )
}
RailActionButton.propTypes = {
    // extended: PropTypes.bool,
    highlight: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.any,
    icon: PropTypes.any,
    onClick: PropTypes.func,
    group: PropTypes.string
}
