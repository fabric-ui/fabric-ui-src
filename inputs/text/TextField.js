import styles from './styles/Input.module.css'
import React, {useEffect, useMemo, useRef} from 'react'
import InputMask from 'react-input-mask'
import LocalePT from '../shared/LocalePT'
import PropTypes from "prop-types";
import ParseCurrency from "./methods/ParseCurrency";
import shared from '../../misc/theme/Shared.module.css'
import Ripple from "../../misc/ripple/Ripple";
import ToolTip from "../../feedback/tooltip/ToolTip";


export default function TextField(props) {
    const lang = LocalePT
    const maskEndRef = useRef()
    const maskStartRef = useRef()
    const ref = useRef()
    useEffect(() => {
        if (props.maskStart)
            ref.current.style.paddingLeft = (maskStartRef.current.offsetWidth + 12) + 'px'
        if (props.maskEnd)
            ref.current.style.paddingRight = (maskEndRef.current.offsetWidth + 12) + 'px'
    }, [props.maskStart, props.maskEnd])


    const content = (value) => (
        <div style={{position: 'relative', width: '100%'}}>
            <div className={styles.mask} ref={maskStartRef}>
                {props.maskStart}
            </div>
            <input
                disabled={props.disabled} lang={''}
                placeholder={props.placeholder}

                type={props.type !== 'password' ? props.type : (!props.visible ? 'password' : 'text')}
                value={value} ref={ref}
                className={styles.inputContainer}
                style={{
                    height: props.size === 'small' ? '36px' : '56px',
                    position: 'relative',
                    zIndex: 5
                }}
                onChange={e => {

                    let data = e.target.value
                    if (props.type === 'number' && props.floatFilter) {
                        data = ParseCurrency(e.target.value)
                    }

                    props.handleChange({target: {value: data}})
                }}
                maxLength={props.maxLength}
            />
            <div className={styles.mask} style={{right: '8px', left: 'unset'}} ref={maskEndRef}>
                {props.maskEnd}
            </div>
        </div>

    )
    const getField = () => {
        switch (true) {
            case props.variant === 'area':
                return (
                    <textarea
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        value={props.value ? props.value : ''}
                        className={styles.inputContainer}
                        style={{
                            minHeight: props.size === 'small' ? '36px' : '56px',
                            resize: props.disabled ? 'none' : 'vertical',
                            overflow: 'hidden',
                            transition: 'border 150ms ease-in, background 150ms ease-in',
                            position: 'relative',
                            zIndex: 5
                        }}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />

                )

            case !props.mask && props.variant !== 'area':
                return content(props.value ? props.value : '')

            case
            props.mask && props.mask !== 'currency' && props.variant !== 'area'
            :
                return (
                    <InputMask
                        mask={props.mask} maskPlaceholder={''}
                        value={props.value ? props.value : ''} alwaysShowMask={false}
                    >
                        {event => content(event.value)}
                    </InputMask>
                )
            default:
                return null
        }
    }

    const color = useMemo(() => {
        if (props.colorVariant === 'secondary')
            return {
                className: shared.secondaryVariant,
                color: '#ff5555'
            }
        else return {
            className: undefined,
            color: '#0095ff'
        }

    }, [props.colorVariant])

    const valid = useMemo(() => {
        return (props.value && props.value.toString().length > 0)
    }, [props.value])

    return (
        <div
            data-valid={valid}
            style={{
                width: props.width,
                height: 'fit-content',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
                overflow: 'visible'
            }}
        >
            <div
                className={shared.labelContainer}
                style={{
                    visibility: valid ? 'visible' : 'hidden',
                    opacity: valid ? '1' : '0',
                }}
            >
                <div className={shared.overflow}>
                    {props.label}
                </div>
                {props.helperText ?
                    <div className={shared.helperText}>
                         <span
                             style={{fontSize: '1rem'}}
                             className="material-icons-round">info</span>
                        <ToolTip content={props.helperText} align={'start'}/>
                    </div>
                    :
                    null
                }
            </div>
            <div
                className={[color.className, shared.wrapper, styles.focus].join(' ')}
                data-disabled={props.disabled ? props.disabled : undefined}
            >
                {getField()}
                <Ripple opacity={.15} accentColor={color.color} disabled={props.disabled}/>
            </div>

            <div className={shared.alertLabel}
                 style={{
                     color: !valid ? '#ff5555' : undefined,
                     visibility: props.required ? 'visible' : 'hidden',
                     display: props.noMargin && !props.required ? 'none' : undefined
                 }}>{lang.required}
            </div>

        </div>
    )
}

TextField.propTypes = {
    helperText: PropTypes.string,

    width: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    required: PropTypes.bool,

    mask: PropTypes.string,

    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf([
        'default',
        'area'
    ]),
    type: PropTypes.oneOf(['number', 'text', 'password']),

    maskStart: PropTypes.any,
    maskEnd: PropTypes.any,
    floatFilter: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default']),
    noMargin: PropTypes.bool,
    colorVariant: PropTypes.oneOf(['default', 'secondary', 'primary'])
}
