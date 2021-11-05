import PropTypes from 'prop-types'
import styles from '../styles/Row.module.css'
import React, {useRef} from 'react'
import keyTemplate from "../templates/keyTemplate";
import {SettingsRounded} from "@material-ui/icons";
import HeaderCell from "./HeaderCell";

export default function Header(props) {
    const ref = useRef()

    return (
        <div className={styles.headerRow} ref={ref}>
            {props.keys.map((e, i) => (
                <React.Fragment key={i + 'header-row-cell'}>
                    <HeaderCell
                        hasOptions={props.hasOptions}
                        setSorts={props.setSorts}
                        additionalWidth={e.additionalWidth ? e.additionalWidth : '0px'}
                        value={e} sorts={props.sorts}
                        length={props.keys.length}
                    />
                    <div
                        style={{display: i === (props.keys.length - 1) && !props.hasOptions ? 'none' : undefined}}
                        className={styles.divider}/>
                </React.Fragment>
            ))}
            <div
                className={styles.cell}
                disabled={true}
                style={{display: props.hasOptions ? 'flex' : 'none', justifyContent: 'center', width: '30px'}}>
                <SettingsRounded style={{fontSize: '1.1rem', color: 'var(--mfc-color-quinary)'}}/>
            </div>
        </div>
    )
}

Header.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate),
    hasOptions: PropTypes.bool,
    setSorts: PropTypes.func,
    sorts: PropTypes.arrayOf(PropTypes.object)
}
