import PropTypes from 'prop-types'
import styles from '../styles/Field.module.css'
import useFilter from "../hooks/useFilters";
import React from 'react'
import keyTemplate from "../../list/templates/keyTemplate";
import Button from "../../../inputs/button/Button";
import Empty from "../../../feedback/empty/Empty";


export default function Field(props) {
    const {
        getField,
        changed
    } = useFilter(props.selectedField, props.setSelectedField, props.setSelectorOpen, props.selectorOpen)

    return (
        <div
            className={styles.container}
        >
            {props.selectedField !== null && props.selectedField !== undefined ?
                (
                    <>
                        {getField()}
                        <div style={{display: 'flex', gap: '4px', width: '100%',  height: '35px'}}>
                            <Button
                                styles={{width: '50%', padding: '4px'}}
                                variant={'filled'} color={'secondary'}

                                onClick={() => {
                                    props.setSelectedField(null)
                                }}>
                                Cancelar
                            </Button>
                            <Button
                                styles={{
                                    padding: '4px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                }}
                                variant={'filled'}
                                disabled={!changed}
                                onClick={() => props.applyFilter()}>
                                <span className="material-icons-round">done</span>
                                Aplicar
                            </Button>
                        </div>
                    </>
                )
                :
                <Empty customLabel={'Nada selecionado'}/>
            }
        </div>
    )
}

Field.propTypes = {
    applyFilter: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    selectorOpen: PropTypes.bool,
    setSelectorOpen: PropTypes.func,
    selectedField: PropTypes.object,
    setSelectedField: PropTypes.func,

}
