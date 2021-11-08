import styles from '../shared/Dropdown.module.css'
import PropTypes from 'prop-types'
import React, {useContext, useMemo, useRef, useState} from 'react'
import {ArrowDropDownRounded} from '@material-ui/icons'
import LocalePT from '../shared/LocalePT'
import FloatingBox from "../floating_box/FloatingBox";
import ToolTip from "../../feedback/tooltip/ToolTip";

import shared from '../../misc/theme/Shared.module.css'
import Button from "../button/Button";
import ThemeContext from "../../misc/theme/ThemeContext";

export default function DropDownField(props) {
    const [open, setOpen] = useState(false)
    const themes = useContext(ThemeContext)
    const lang = LocalePT
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
                 }}>{props.label}
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
                    <ArrowDropDownRounded
                        style={{transform: !open ? 'unset' : 'rotate(180deg)', transition: '150ms linear'}}/>
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
                                    borderTop: index > 0 ? themes.theme?.border0 + ' 1px solid' : 'none'
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
                     visibility: props.required ? 'visible' : 'hidden',
                 }}
            >
                {lang.required}
            </div>

        </div>
    )
}

DropDownField.propTypes = {
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
