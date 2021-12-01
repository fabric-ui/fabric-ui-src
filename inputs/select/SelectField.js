import styles from '../shared/styles/Select.module.css'
import PropTypes from 'prop-types'
import React, {useMemo, useRef, useState} from 'react'
import FloatingBox from "../floating_box/FloatingBox";
import ToolTip from "../../feedback/tooltip/ToolTip";

import shared from '../shared/styles/Shared.module.css'
import Button from "../button/Button";
import useLocale from "../../misc/hooks/useLocale";

export default function SelectField(props) {
    const [open, setOpen] = useState(false)
    const translate = useLocale()
    const ref = useRef()
    const selected = useMemo(() => {
        return props.choices.find(e => e.key === props.value)
    }, [props.value])

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
        <div
            style={{
                width: props.width,
                alignItems: props.value ? 'unset' : 'flex-start',
            }}
            ref={ref}
            className={styles.wrapper}
        >
            <div className={shared.labelContainer}
                 style={{
                     visibility: (props.value !== undefined && props.value !== null) ? 'visible' : 'hidden',
                     opacity: (props.value !== undefined && props.value !== null) ? '1' : '0',
                 }}>
                <div className={shared.overflow}>
                    {props.label}
                </div>
            </div>
            <div
                className={[shared.wrapper, color.className].join(' ')}
                data-highlight={open ? open : undefined}
                data-disabled={props.disabled ? props.disabled : undefined}
            >
                <Button
                    disabled={props.disabled}
                    variant={"outlined"}
                    highlight={open}
                    styles={{
                        height: props.size === 'small' ? '36px' : '56px',
                        overflow: "hidden",
                        maxWidth: 'unset'
                    }}
                    className={[color.className, styles.selectContainer, shared.labelContainer].join(' ')}
                    onClick={() => setOpen(!open)}
                >
                    <span
                        style={{transform: !open ? 'unset' : 'rotate(180deg)', transition: '150ms linear'}}
                        className="material-icons-round">arrow_drop_down</span>

                    {selected ?
                        <div className={styles.overflow} style={{color: selected.color}}>
                            {selected.value}
                        </div>
                        : props.label}

                </Button>
            </div>
            <FloatingBox
                parentNode={ref.current?.parentNode}
                open={open}
                setOpen={setOpen}
                reference={ref.current}
                width={'100%'}
            >

                <div className={styles.dropDownChoicesContainer}>
                    {props.choices.map((choice, index) => (
                        <React.Fragment key={index + '-choice-button'}>
                            <Button
                                styles={{
                                    borderRadius: '0',
                                    borderTop: index > 0 ? 'var(--fabric-border-primary) 1px solid' : 'none'
                                }}
                                highlight={choice.key === props.value}
                                onClick={() => {
                                    props.handleChange(choice.key)
                                    setOpen(false)
                                }}
                                className={styles.dropDownButton}
                            >
                                <div className={styles.overflow}>
                                    {choice.value}
                                </div>
                                <ToolTip content={choice.value}/>
                            </Button>
                        </React.Fragment>

                    ))}
                </div>
            </FloatingBox>
            <div className={shared.alertLabel}
                 style={{
                     color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                 }}
            >

                {props.required ?translate('required') : undefined}
                {props.helperText ?
                    <div className={shared.helperText}>
                        <span style={{
                            fontSize: '1rem'
                        }} className="material-icons-round">info</span>
                        <ToolTip content={props.helperText} align={'start'}/>
                    </div>
                    :
                    null
                }
            </div>

        </div>
    )
}

SelectField.propTypes = {
    helperText: PropTypes.string,

    width: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
        color: PropTypes.string
    })).isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default']),
    colorVariant: PropTypes.oneOf(['default', 'secondary', 'primary'])
}
