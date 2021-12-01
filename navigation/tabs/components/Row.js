import styles from "../styles/Vertical.module.css";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "../../../inputs/button/Button";
import ToolTip from "../../../feedback/tooltip/ToolTip";

export default function Row(props) {
    const [hidden, setHidden] = useState(false)

    return (
        <div className={styles.rowWrapper}>
            <Button
                className={styles.button} variant={'minimal-horizontal'}
                color={hidden ? 'primary' : "secondary"}
                styles={{
                    display: props.groupName ? 'flex' : 'none',
                    alignItems: 'center',
                    padding: '8px'
                }}
                onClick={() => setHidden(!hidden)}
            >
                <div className={styles.overflow}>
                    {props.groupName}
                </div>
                <ToolTip content={props.groupName} align={'middle'} justify={"end"}/>
                <span className="material-icons-round" style={{
                    transform: hidden ? 'rotate(180deg)' : "unset",
                    transition: '150ms linear'
                }}>arrow_drop_down</span>
            </Button>

            {hidden ? null : props.buttons.map((b, bI) => b.group === props.groupName ? (
                <React.Fragment key={props.index + '-button-header-tab-' + bI}>
                    <Button
                        variant={'minimal-horizontal'}
                        className={[styles.button, styles.color].join(' ')}
                        styles={{fontWeight: 'normal', maxWidth: '100%', width: '100%'}}
                        highlight={props.open === bI}
                        disabled={b.disabled}
                        onClick={() => {
                            props.setOpen(bI)
                        }}>
                        <div className={styles.overflow}>
                            {b.label}
                        </div>
                    </Button>
                </React.Fragment>
            ) : null)}

        </div>
    )
}

Row.propTypes = {
    groupName: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    setOpen: PropTypes.func,
    open: PropTypes.number
}