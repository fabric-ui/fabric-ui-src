import PropTypes from 'prop-types'
import styles from './styles/Checkbox.module.css'
import shared from '../../misc/theme/Shared.module.css'
import React from "react";
import LocalePT from "../shared/LocalePT";
import ToolTip from "../../feedback/tooltip/ToolTip";

export default function CheckboxGroup(props){
    const lang = LocalePT
    return(
        <div style={{width: props.width, display: 'grid', gap: '4px'}}>
            <fieldset className={styles.wrapper} style={{width: '100%'}}>
                <legend className={shared.labelContainer} style={{padding: '0 8px'}}>
                    <div className={shared.overflow}>
                        {props.label}
                    </div>
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
                </legend>
                <div className={styles.wrapperChildren}>
                    {props.children}
                </div>

            </fieldset>
            <div className={shared.alertLabel}
                 style={{
                     color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden',
                 }}>{lang.required}</div>
        </div>
    )
}

CheckboxGroup.propTypes={
    helperText: PropTypes.string,

    value: PropTypes.any,
    children: PropTypes.node,
    label: PropTypes.string,
    width: PropTypes.string,
    required: PropTypes.bool
}