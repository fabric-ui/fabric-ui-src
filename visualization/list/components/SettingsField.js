import styles from "../styles/Settings.module.css";
import shared from "../../../../core/inputs/shared/styles/Shared.module.css";
import Button from "../../../../core/inputs/button/Button";
import ToolTip from "../../../../core/feedback/tooltip/ToolTip";
import React from "react";
import PropTypes from "prop-types";

export default function SettingsField(props){
    return (
        <div className={[styles.fieldRow, shared.wrapper].join(' ')}>
            <div className={styles.fieldLabel}>
                {props.field.label}
            </div>
            <input
                disabled={!props.field.visible}
                type={'range'}
                max={100}
                min={0}
                onChange={(event) => {
                    props.dispatchKeys({
                        type: props.actions.UPDATE_SIZE,
                        payload: {key: props.field.key, size: event.target.value + '%', subfieldKey: props.field.subfieldKey, type: props.field.type}
                    })
                }}
                className={styles.range}
                value={props.field.additionalWidth ? parseInt(props.field.additionalWidth.replace('%', '')) : '0'}/>

            <Button
                className={styles.visibilityButton}
                color={props.field.visible ? 'secondary' : undefined}
                onClick={() => {
                    props.dispatchKeys({
                        type: props.actions.UPDATE_VISIBILITY,
                        payload: props.field
                    })
                }}>
                {props.field.visible ?
                    <span className="material-icons-round">visibility</span>
                    :
                    <span className="material-icons-round">visibility_off</span>
                }
                <ToolTip>
                    {props.field.visible ? 'Esconder' : 'Mostrar'}
                </ToolTip>
            </Button>
        </div>
    )
}
SettingsField.propTypes={
    field: PropTypes.object,
    actions: PropTypes.array,
    dispatchKeys: PropTypes.func
}