import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import React, {useEffect, useMemo} from 'react'
import Button from "../../inputs/button/Button";
import Modal from "../../navigation/modal/Modal";

export default function Alert(props) {
    const variant = useMemo(() => {
        switch (props.variant) {
            case 'success':
                return {className: styles.success, icon: <span className="material-icons-round">done</span>}
            case 'alert':
                return {className: styles.alert, icon: <span className="material-icons-round">warning</span>}
            case 'info':
                return {className: styles.info, icon: <span className="material-icons-round">info</span>}
            default:
                return {icon: <span className="material-icons-round">error</span>}
        }
    }, [props.variant])

    useEffect(() => {
        let timeout = setTimeout(() => {
            try {
                props.handleClose()
            } catch (e) {
            }
        }, props.delay ? props.delay : 5000)
        return () => {
            if (timeout)
                clearTimeout(timeout)
        }
    }, [props.open])

    return (
        <Modal
            open={props.open} wrapperClassName={styles.wrapper}
            handleClose={() => props.handleClose(false)}
            animationStyle={'fade'}
            variant={'fit'}
            blurIntensity={0}
            className={[styles.alertContainer, variant.className].join(' ')}>
            <div className={styles.content} onClick={() => {
                if (props.onClick)
                    props.onClick()
            }}>
                <div
                    className={[styles.icon, styles.button].join(' ')}
                >
                    {variant.icon}
                </div>
                {props.children}
            </div>
            <Button
                color={'secondary'}
                className={styles.button}
                onClick={() => props.handleClose(true)}
            >
                <span style={{fontSize: '1.1rem'}} className="material-icons-round">close</span>
            </Button>
        </Modal>
    )
}

Alert.propTypes = {
    variant: PropTypes.oneOf(['success', 'alert', 'error', 'info']),
    onClick: PropTypes.func,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    delay: PropTypes.number,
    children: PropTypes.node
}
