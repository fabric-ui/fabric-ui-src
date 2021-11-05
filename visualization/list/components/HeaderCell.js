import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import ToolTip from "../../../feedback/tooltip/ToolTip";
import {ArrowDownwardRounded, LinkRounded} from "@material-ui/icons";
import Button from "../../../inputs/button/Button";
import styles from '../styles/Row.module.css'
import keyTemplate from "../templates/keyTemplate";

export default function HeaderCell(props) {
    const ref = useRef()
    const [currentSort, setCurrentSort] = useState(undefined)

    return (

        <Button
            className={styles.cell} variant={'minimal-horizontal'}
            styles={{
                width: `calc(${(1 / props.length) * 100}% + ${props.additionalWidth})`,

                color: props.value.type === 'object' ? 'var(--mfc-color-quinary)' : 'inherit',
                justifyContent: props.value.type !== 'object' ? 'space-between' : 'flex-start'
            }}
            disabled={props.value.type === 'object'}
            onClick={() => {
                const exists = props.sorts.findIndex(e => e.key === props.value.key)
                switch (currentSort) {
                    case 'desc': {
                        setCurrentSort('asc')
                        let value = [...props.sorts]
                        value[exists] = {key: props.value.key, asc: true, desc: false}
                        props.setSorts(value)
                        break
                    }
                    case 'asc': {
                        setCurrentSort(undefined)

                        let value = [...props.sorts]
                        value.splice(exists, 1)
                        props.setSorts(value)

                        break
                    }
                    default: {
                        setCurrentSort('desc')

                        props.setSorts([...props.sorts, {key: props.value.key, asc: false, desc: true}])
                        break
                    }
                }
            }}
            reference={ref}
        >
            <LinkRounded style={{
                display: props.value.type !== 'object' ? 'none' : undefined,
                fontSize: '1.1rem',
            }}/>
            <div className={styles.overflow}>
                {props.value.label}
                <ToolTip content={props.value.label.toUpperCase()}/>
            </div>
            <ArrowDownwardRounded
                style={{
                    display: props.value.type === 'object' ? 'none' : undefined,
                    transform: currentSort === 'desc' ? 'rotate(180deg)' : undefined,
                    fontSize: '1.1rem',
                    transition: '150ms linear',
                    color: currentSort === undefined ? 'var(--mfc-color-quinary)' : 'inherit'
                }}
            />
        </Button>

    )
}

HeaderCell.propTypes = {
    hasOptions: PropTypes.bool,
    length: PropTypes.number,
    additionalWidth: PropTypes.string,
    value: keyTemplate,
    sorts: PropTypes.array,
    setSorts: PropTypes.func
}