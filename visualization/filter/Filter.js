import styles from "./styles/Field.module.css";
import Field from "./templates/Field";
import ToolTip from "../../feedback/tooltip/ToolTip";
import {CloseRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import keyTemplate from "../list/templates/keyTemplate";
import Button from "../../inputs/button/Button";

export default function Filter(props) {
    return (

        <div className={styles.activeFiltersContainer}
             style={{display: props.filters.length === 0 ? 'none' : undefined}}>
            <Field
                open={props.open} handleClose={() => props.setOpen(false)}
                setFilters={props.setFilters} filters={props.filters}
                selectedField={props.selectedField}
                setSelectedField={props.setSelectedField} keys={props.keys}
                applyFilter={() => {
                    props.setOpen(false)
                    props.setFilters(prevState => {
                        return [
                            ...prevState,
                            props.selectedField
                        ]
                    })
                    props.setSelectedField(null)
                }}
            />

            {props.filters.map((e, i) => (
                <div className={styles.filter}>
                    <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                        {e.label}
                    </div>
                    <div className={styles.overflow} style={{fontSize: '.7rem'}}>
                        {props.getType(e)}
                    </div>
                    <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                        {e.type === 'date' ? props.parseDate(e.value) : e.value}
                    </div>
                    <ToolTip>
                        <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                            {e.label}:
                        </div>
                        <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.7rem'}}>
                            {props.getType(e)}
                        </div>

                        <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                            {e.type === 'date' ? props.parseDate(e.value) : e.value}
                        </div>
                    </ToolTip>
                    <Button
                        color={'secondary'}
                        onClick={() => {
                            let newFilters = [...props.filters]
                            newFilters.splice(i, 1)
                            props.setFilters(newFilters)
                        }} className={styles.button}>
                        <CloseRounded style={{fontSize: '1.1rem'}}/>
                    </Button>
                </div>
            ))
            }

        </div>
    )
}

Filter.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    filters: PropTypes.array,
    setFilters: PropTypes.func,
    getType: PropTypes.func,
    parseDate: PropTypes.func,
    selectedField: PropTypes.object,
    setSelectedField: PropTypes.func,

}