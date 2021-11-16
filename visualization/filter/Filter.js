import styles from "./styles/Field.module.css";
import ToolTip from "../../feedback/tooltip/ToolTip";
import React, {useState} from "react";
import PropTypes from "prop-types";
import keyTemplate from "../list/templates/keyTemplate";
import Button from "../../inputs/button/Button";
import Modal from "../../navigation/modal/Modal";
import Field from "./templates/Field";


export default function Filter(props) {
    const [selectedFilter, setSelectedFilter] = useState(null)
    const [selectorOpen, setSelectorOpen] = useState(false)
    const getField = (e) => {
        return {
            icon: getIcon(e.type),
            label: (
                <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                    {e.label}
                    <ToolTip content={e.label}/>
                </div>
            ),
            onClick: () => {
                const op = e.type !== 'object' ? (e.type === 'string' ? {contains: true} : {greater_than: true}) : {}
                setSelectedFilter({
                    ...e,
                    ...op
                })
            }
        }
    }
    const getIcon = (type) => {
        let icon
        switch (type) {
            case 'date': {
                icon = <span className="material-icons-round" style={{fontSize: '1.2rem'}}>calendar_today</span>
                break
            }

            case 'string': {
                icon = <span className="material-icons-round" style={{fontSize: '1.2rem'}}>text_fields</span>
                break
            }
            case 'object': {
                icon =  <span className="material-icons-round" style={{fontSize: '1.2rem'}}>link</span>
                break
            }
            default: {
                icon = <span className="material-icons-round" style={{fontSize: '1.2rem'}}>category</span>
                break
            }
        }

        return icon
    }

    return (
        <>
            <Modal
                variant={'fill'} blurIntensity={.05}
                open={props.open} className={styles.modalWrapper}
                handleClose={(event) => {
                    if (!selectedFilter || !selectorOpen) {
                        props.setOpen(false)
                        setSelectedFilter(null)
                    }

                }}
                animationStyle={'slide-bottom'}
            >

                <div className={styles.filters}>
                    {props.keys.map((k, i) => {
                        const button = getField(k)
                        return (
                            <React.Fragment key={i + '-filter'}>
                                <Button
                                    highlight={selectedFilter?.key === k.key}
                                    onClick={button.onClick}

                                    className={styles.filterButton}
                                    variant={"minimal-horizontal"}
                                >
                                    {button.icon}
                                    {button.label}
                                </Button>
                            </React.Fragment>
                        )
                    })}
                </div>
                <Field
                    setFilters={props.setFilters} filters={props.filters}
                    selectedField={selectedFilter}
                    setSelectedField={setSelectedFilter} selectorOpen={selectorOpen}
                    keys={props.keys} setSelectorOpen={setSelectorOpen}
                    applyFilter={() => {
                        props.setOpen(false)
                        props.setFilters(prevState => {
                            return [
                                ...prevState,
                                selectedFilter
                            ]
                        })
                        setSelectedFilter(null)
                    }}
                />
            </Modal>

            <div className={styles.activeFiltersContainer}>
                {props.filters.map((e, i) => (
                    <div className={styles.filter}>
                        <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                            {e.label}
                        </div>
                        <div className={styles.overflow} style={{fontSize: '.7rem'}}>
                            {props.getType(e)}
                        </div>
                        <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                            {e.type === 'date' ? props.parseDate(e.value) : e.type === 'object' ? e.objectLabel : e.value}
                        </div>
                        <ToolTip>
                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.label}:
                            </div>
                            <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.7rem'}}>
                                {props.getType(e)}
                            </div>

                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.type === 'date' ? props.parseDate(e.value) : e.type === 'object' ? e.objectLabel : e.value}
                            </div>
                        </ToolTip>
                        <Button
                            color={'secondary'}
                            onClick={() => {
                                let newFilters = [...props.filters]
                                newFilters.splice(i, 1)
                                props.setFilters(newFilters)
                            }} className={styles.button}>
                            <span className="material-icons-round" style={{fontSize: '1.1rem'}}>close</span>
                        </Button>
                    </div>
                ))
                }
            </div>
        </>
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
}