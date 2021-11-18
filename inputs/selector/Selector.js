import React, {useMemo, useState} from 'react'
import styles from './styles/Selector.module.css'
import SelectorModal from "./modules/SelectorModal";
import PropTypes from "prop-types";
import shared from '../shared/styles/Shared.module.css'
import Row from "./modules/Row";
import Modal from "../../navigation/modal/Modal";
import Button from "../button/Button";
import ToolTip from "../../feedback/tooltip/ToolTip";
import useLocale from "../../misc/hooks/useLocale";

export default function Selector(props) {
    const [open, setOpen] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const translate = useLocale()
    const color = useMemo(() => {
        if (props.colorVariant === 'secondary')
            return {
                className: shared.secondaryVariant,
                color: '#0095ff'
            }
        else return {
            className: undefined,
            color: '#0095ff'
        }

    }, [])

    return (
        <>

            <SelectorModal
                {...props} open={props.open === true ? props.open : open}
                onCreate={() => setOpenCreate(true)}
                setOpen={props.handleClose ? props.handleClose : setOpen}/>
            <div
                style={{
                    width: props.width,
                    maxWidth: props.width,
                    display: 'grid',
                    gap: '4px'
                }}
            >
                <div
                    className={shared.labelContainer}
                    style={{
                        visibility: props.value !== null && props.value !== undefined ? 'visible' : 'hidden',
                        opacity: props.value !== null && props.value !== undefined ? '1' : '0',
                        transition: 'visibility 0.2s ease,opacity 0.2s ease',
                        textTransform: 'capitalize',
                    }}
                >
                    <div className={shared.overflow}>
                        {props.label}
                    </div>
                </div>
                <div
                    className={[shared.wrapper, color.className, styles.buttonWrapper].join(' ')}
                    data-highlight={open ? open : undefined}
                    data-disabled={props.disabled ? props.disabled : undefined}
                >

                    {props.value !== null && props.value !== undefined ?
                        <Row
                            onClick={() => {
                                if (props.onClick)
                                    props.onClick()
                                else
                                    setOpen(true)
                            }}
                            disabled={props.disabled}
                            data={props.value} highlight={open}
                            keys={props.keys}
                            height={props.size === 'small' ? '36px' : '56px'}
                        />
                        :
                        <Button
                            disabled={props.disabled}
                            highlight={open}
                            variant={'outlined'}
                            styles={{
                                height: props.size === 'small' ? '36px' : '56px',
                                overflow: "hidden",
                                maxWidth: 'unset',
                                marginTop: 'unset',
                                zIndex: 5
                            }} color={props.colorVariant === 'secondary' ? 'secondary' : 'primary'}
                            className={[styles.button, shared.labelContainer].join(' ')}
                            onClick={() => {
                                if (props.onClick)
                                    props.onClick()
                                else
                                    setOpen(true)
                            }}
                        >
                            {props.placeholder}
                            <span
                                style={{fontSize: '1.2rem'}}
                                className="material-icons-round">launch</span>

                        </Button>
                    }
                </div>
                <div className={shared.alertLabel}
                     style={{
                         color: props.value === null || props.value === undefined ? '#ff5555' : undefined,
                     }}>
                    {props.required ? translate('required') : null}
                    {props.helperText ?
                        <div className={shared.helperText}>
                            <span className="material-icons-round" style={{fontSize: '1rem'}}>info</span>
                            <ToolTip content={props.helperText} align={'start'}/>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <Modal
                open={openCreate}
                handleClose={() => setOpenCreate(false)}
                animationStyle={'fade'}
                blurIntensity={.1}
                className={styles.createModal}
            >
                {typeof props.children === 'function' ? props.children(() => {
                    setOpenCreate(false)
                    props.hook.clean()
                }) : undefined}
            </Modal>
        </>
    )
}

Selector.propTypes = {
    helperText: PropTypes.string,

    children: PropTypes.func,
    onClick: PropTypes.func,
    hook: PropTypes.object.isRequired,

    label: PropTypes.any,
    placeholder: PropTypes.any,
    required: PropTypes.bool,
    value: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.string,
    createOption: PropTypes.bool,

    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,

    open: PropTypes.bool,
    handleClose: PropTypes.func,

    size: PropTypes.oneOf(['small', 'default']),
    colorVariant: PropTypes.oneOf(['default', 'secondary', 'primary'])
}

