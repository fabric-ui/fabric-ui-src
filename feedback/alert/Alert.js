import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import {CheckRounded, CloseRounded, ErrorRounded, InfoRounded, WarningRounded} from '@material-ui/icons'
import React, {useEffect, useMemo} from 'react'
import Button from "../../inputs/button/Button";
import Modal from "../../navigation/modal/Modal";

export default function Alert(props) {
    const variant = useMemo(() => {
        switch (props.variant) {
            case 'success':
                return {className: styles.success, icon: <CheckRounded/>}
            case 'alert':
                return {className: styles.alert, icon: <WarningRounded/>}
            case 'info':
                return {className: styles.info, icon: <InfoRounded/>}
            default:
                return {icon: <ErrorRounded/>}
        }
    }, [props.variant])

    useEffect(() => {
        let timeout
        if (props.delay)
            timeout = setTimeout(() => {
                if (!props.open)
                    try {
                        props.handleClose()
                    } catch (e) {
                    }
            }, 5000)
        return () => {
            if (timeout)
                clearTimeout(timeout)
        }
    }, [props.open, props.delay])

    return (
        <Modal
            open={props.open} wrapperClassName={styles.wrapper}
            handleClose={() => props.handleClose(false)}
            animationStyle={'fade'}
            variant={'fit'}
            blurIntensity={0}
            className={[styles.alertContainer, variant.className].join(' ')}>
            <div className={styles.content} onClick={() => props.onClick()}>
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
                <CloseRounded style={{fontSize: '1.1rem'}}/>
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
