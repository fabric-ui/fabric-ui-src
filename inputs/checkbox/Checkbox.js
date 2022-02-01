import styles from './styles/Checkbox.module.css'
import PropTypes from 'prop-types'
import React from 'react'

export default function Checkbox(props) {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', opacity: props.disabled ? '.8' : 1}}>
            <button
                className={styles.container}
                disabled={props.disabled}
                style={{
                    background: props.checked ? 'var(--fabric-accent-color)' : undefined,
                    border: props.checked ? 'var(--fabric-accent-color) 1px solid' : undefined
                }}
                onClick={() => props.handleCheck(props.checked)}>
                <span style={{
                    color: 'white',
                    visibility: props.checked ? 'visible' : 'hidden',
                    fontSize: '15px',
                    fontWeight: "bold"
                }} className="material-icons-round">done</span>

            </button>
            {props.label ?
                <div style={{fontSize: '.9rem'}}>
                    {props.label}
                </div>
                : null}
        </div>
    )
}
Checkbox.propTypes = {
    checked: PropTypes.bool,
    handleCheck: PropTypes.func,
    label: PropTypes.any,
    disabled: PropTypes.bool
}
