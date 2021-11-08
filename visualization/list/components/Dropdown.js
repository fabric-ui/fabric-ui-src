import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from '../styles/Dropdown.module.css'
import Button from "../../../inputs/button/Button";
import Modal from "../../../navigation/modal/Modal";

export default function Dropdown(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <Button
                highlight={open}
                variant={props.variant} onClick={() => setOpen(true)}
                disabled={props.disabled}
                className={props.className}>
                {props.label}
            </Button>
            <Modal
                variant={"fit"}
                styles={{transform: props.align === 'top' ? 'translateY(-100%)' : 'translateY(100%)'}}
                blurIntensity={0} className={styles.buttons}
                animationStyle={'fade'}
                open={open}
                handleClose={() => setOpen(false)}>
                {props.buttons?.map((b, i) => (
                    <React.Fragment key={'dropdown-' + i}>


                        <Button
                            disabled={b.disabled}
                            onClick={() => {
                                b.onClick(props.onClickProps)
                                setOpen(false)
                            }}
                            className={styles.button}>
                            {b.icon}
                            <div className={styles.buttonLabel}>
                                {b.label}
                            </div>
                        </Button>
                    </React.Fragment>
                ))}
            </Modal>
        </div>
    )
}

Dropdown.propTypes = {
    variant: PropTypes.oneOf(['minimal', 'filled', 'outlined', 'minimal-horizontal']),
    className: PropTypes.string,
    onClickProps: PropTypes.any,
    label: PropTypes.any,
    disabled: PropTypes.bool,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),

    align: PropTypes.oneOf(['top', 'bottom'])
}
