import PropTypes from "prop-types";
import styles from '../styles/SelectorModal.module.css'
import ToolTip from "../../../feedback/tooltip/ToolTip";
import React from "react";
import RowCell from "../../../visualization/shared/RowCell";
import Button from "../../button/Button";

export default function Row(props) {

    return (
        <Button
            onClick={() => props.onClick()}
            reference={props.reference} highlight={props.highlight}
            variant={'outlined'}
            className={styles.row}
            disabled={props.disabled}
            styles={props.main ? {
                background: 'var(--mfc-background-tertiary)',
            } : {
                height: props.height,
                position: 'relative',
                zIndex: 5
            }}
        >

            <div style={{display: props.main && !props.data ? undefined : 'none'}}>
                Nada selecionado.
            </div>
            {props.main && !props.data ?
                null :
                props.keys.map((k, i) => !k.visible ? null : (
                    <div
                        key={'selector-row-' + i}
                        className={styles.rowColumn}
                        style={{width: ((1 / props.keys.filter(e => e.visible).length) * 100) + '%'}}
                    >
                        <div className={styles.overflowEllipsis} style={{maxWidth: '90%'}}>
                            <RowCell data={props.data} field={k}/>
                        </div>

                        <div
                            className={[styles.columnLabel, styles.overflowEllipsis, styles.emptyRow].join(' ')}
                            style={{maxWidth: '75%'}}>
                            {k.label}
                        </div>
                        <ToolTip justify={'start'}>
                            <div className={styles.rowColumn}>
                                <RowCell data={props.data} field={k}/>
                                <div className={styles.columnLabel}>
                                    {k.label}
                                </div>
                            </div>
                        </ToolTip>
                    </div>
                ))}

        </Button>
    )
}
Row.propTypes = {
    height: PropTypes.any,
    highlight: PropTypes.bool,
    main: PropTypes.bool,

    keys: PropTypes.array,
    data: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    identificationKey: PropTypes.string,
    reference: PropTypes.any,
    index: PropTypes.number,
    onDrop: PropTypes.func,
}
