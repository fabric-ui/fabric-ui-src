import styles from "./styles/Action.module.css";
import PropTypes from "prop-types";
import Ripple from "../../misc/ripple/Ripple";
import ToolTip from "../../feedback/tooltip/ToolTip";

export default function RailActionButton(props) {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={styles.buttonWrapper}
            data-extended={JSON.stringify(props.extended)}
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


            <ToolTip content={props.label} align={'middle'} justify={"end"}/>
        </button>
    )
}
RailActionButton.propTypes = {
    extended: PropTypes.bool,
    highlight: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.any,
    icon: PropTypes.any,
    onClick: PropTypes.func
}