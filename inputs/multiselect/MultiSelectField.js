import styles from '../shared/styles/Select.module.css'

import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import FloatingBox from "../floating_box/FloatingBox";
import ToolTip from "../../feedback/tooltip/ToolTip";
import Checkbox from "../checkbox/Checkbox";
import shared from '../shared/styles/Shared.module.css'
import Button from "../button/Button";
import useLocale from "../../misc/hooks/useLocale";

export default function MultiSelectField(props) {
    const [open, setOpen] = useState(false)
    const translate = useLocale()
    const ref = useRef()
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (typeof props.value === 'string' && selected.length === 0 && props.value.length > 0)
            setSelected(props.value.split('-*/'))
        else if (props.asArray)
            setSelected(props.value ? props.value : [])
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
                    disabled={props.disabled} variant={"outlined"}
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

                    {props.value ?
                        <div className={styles.valueContainer}>
                            {props.asArray ? props.value.length : (props.value.split('-*/').length - 1)} - {translate('values')}
                        </div>
                        : props.label}
                </Button>
            </div>
            <FloatingBox open={open} setOpen={setOpen} reference={ref.current} width={'100%'}>
                <div className={styles.dropDownChoicesContainer} style={{padding: '0 8px'}}>
                    {props.choices.map((choice, index) => (
                        <div
                            style={{overflow: "hidden"}}
                            className={styles.multiSelectRow}
                            key={'multi-choice-' + index}>
                            <Checkbox
                                type={'checkbox'}
                                handleCheck={() => {
                                    let newSelected = [...selected]
                                    if (selected.includes(choice.key)) {
                                        newSelected.splice(newSelected.indexOf(choice.key), 1)
                                        setSelected(newSelected)
                                    } else {
                                        newSelected.push(choice.key)
                                        setSelected(newSelected)
                                    }

                                    if (!props.asArray) {
                                        let newData = ''
                                        newSelected.forEach(e => {
                                            if (e.length > 0)
                                                newData = newData + '-*/' + e
                                        })
                                        props.handleChange(newData)
                                    } else
                                        props.handleChange(newSelected)

                                    setOpen(false)
                                }} className={styles.multiSelectRowCheckbox}
                                checked={selected.includes(choice.key)}
                                label={
                                    <div
                                        style={{color: choice.color ? choice.color : undefined}}
                                        className={styles.multiSelectRowContent}
                                    >
                                        {choice.value}
                                    </div>
                                }
                            />

                            <ToolTip content={choice.value} align={'middle'} justify={'start'}/>
                        </div>
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
                      <span
                          style={{fontSize: '1rem'}}
                          className="material-icons-round">info</span>

                        <ToolTip content={props.helperText} align={'start'}/>
                    </div>
                    :
                    null
                }
            </div>

        </div>
    )
}

MultiSelectField.propTypes = {
    helperText: PropTypes.string,

    width: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        value: PropTypes.any,
        color: PropTypes.string
    })).isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    asArray: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default']),
    colorVariant: PropTypes.oneOf(['default', 'secondary', 'primary'])
}
