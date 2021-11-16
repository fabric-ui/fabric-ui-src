import PropTypes from 'prop-types'
import styles from '../styles/Row.module.css'
import React from 'react'
import RowCell from "../../shared/RowCell";
import keyTemplate from "../templates/keyTemplate";
import Button from "../../../inputs/button/Button";
import Dropdown from "../../../navigation/dropdown/Dropdown";

export default function Row(props) {
    return (
        <div style={{display: 'flex', maxWidth: '100%', overflow: 'hidden'}} ref={props.reference}>
            <Button className={styles.row}
                    variant={'minimal-horizontal'} onClick={() => props.onClick()}>
                {props.keys.map((e, i) => (
                    <React.Fragment key={i + '-row-cell-' + props.index}>
                        <div
                            style={{display: i === 0 ? 'none' : undefined, height: '40%'}}
                            className={styles.divider}
                        />
                        <div
                            className={styles.cell}

                            style={{
                                maxWidth: `calc(${(1 / props.keys.length) * 100}% + ${e.additionalWidth ? e.additionalWidth : '0px'})`,
                                width: `calc(${(1 / props.keys.length) * 100}% + ${e.additionalWidth ? e.additionalWidth : '0px'})`,
                                overflow: 'hidden'
                            }}>
                            <div className={styles.overflow}>
                                <RowCell data={props.entry} field={e}/>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </Button>
            {props.controlButtons ?
                <div
                    className={styles.cell}
                    style={{
                        width: '30px',
                        alignItems: 'unset',
                        height: '60px',
                        padding: 0
                    }}>
                    <Dropdown
                        className={styles.mainButton}
                        variant={'minimal-horizontal'}
                        options={props.controlButtons.map(e => {
                            return {...e, onClickEvent: props.entry}
                        })}>
                          <span className="material-icons-round">
                            arrow_drop_down
                            </span>
                    </Dropdown>
                </div>
                :
                null}
        </div>
    )
}

Row.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate),
    entry: PropTypes.object,
    onClick: PropTypes.func,
    hasOptions: PropTypes.bool,
    index: PropTypes.number,
    reference: PropTypes.func,
    controlButtons: PropTypes.array

}
