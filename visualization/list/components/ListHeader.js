import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import React from "react";
import {AddRounded, FilterListRounded, RefreshRounded, SettingsRounded} from "@material-ui/icons";
import Dropdown from "./Dropdown";
import useHeader from "../hook/useHeader";
import keyTemplate from "../templates/keyTemplate";
import Filter from "../../filter/Filter";
import Button from "../../../inputs/button/Button";
import Header from "./Header";

export default function ListHeader(props) {
    const {
        getType,
        parseDate,
        open,
        setOpen,
        selectedField,
        setSelectedField,
        getField
    } = useHeader(props.dispatch, props.actions)

    return (
        <div className={styles.wrapper} style={{boxShadow: props.scrolled ? undefined : 'none'}}>
            <div className={styles.header} style={{marginBottom: props.hook.filters.length === 0 ? '8px' : undefined}}>
                {props.title}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Button
                        variant={'outlined'}
                        className={styles.button}
                        onClick={() => props.hook.clean()}
                    >
                        Recarregar
                        <RefreshRounded style={{fontSize: '1.3rem'}}/>
                    </Button>
                    <Button
                        variant={'outlined'}
                        className={styles.button}
                        onClick={() => props.setOpenSettings(true)}
                    >
                        Configurações
                        <SettingsRounded style={{fontSize: '1.3rem'}}/>
                    </Button>
                    {props.noFilters ? null :
                        <Dropdown
                            className={styles.button}
                            disabled={false} variant={'outlined'}
                            label={(
                                <div className={styles.dropdownLabel}>
                                    Filtros
                                    <FilterListRounded style={{fontSize: '1.3rem'}}/>
                                </div>
                            )}
                            buttons={props.keys.map(e => getField(e))}
                        />}
                    <Button
                        styles={{display: props.createOption ? undefined : 'none', color: 'white'}}
                        onClick={() => props.onCreate()} variant={"filled"}
                        className={styles.button}>
                        <AddRounded/>
                    </Button>
                </div>
            </div>
            {props.noFilters ?
                null
                :
                <div style={{padding: '8px'}}>
                    <Filter
                        keys={props.keys} filters={props.hook.filters} setFilters={props.hook.setFilters}
                        getType={getType} open={open} setOpen={setOpen}
                        parseDate={parseDate} selectedField={selectedField} setSelectedField={setSelectedField}
                    />
                </div>
            }
            <Header
                keys={props.keys.filter(e => e.visible === true)}
                sorts={props.hook.sorts}
                setSorts={props.hook.setSorts}
                hasOptions={props.hasOptions}
            />
        </div>

    )
}

ListHeader.propTypes = {
    scrolled: PropTypes.bool,

    hook: PropTypes.object,
    noFilters: PropTypes.bool,
    dispatch: PropTypes.func,
    actions: PropTypes.object,

    title: PropTypes.any,

    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    setOpenSettings: PropTypes.func,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func,
    hasOptions: PropTypes.bool
}
