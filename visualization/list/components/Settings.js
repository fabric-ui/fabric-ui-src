import Modal from "../../../navigation/modal/Modal";
import PropTypes from 'prop-types'
import keyTemplate from "../templates/keyTemplate";
import styles from '../styles/Settings.module.css'
import React, {useEffect, useState} from 'react'
import Tabs from "../../../navigation/tabs/Tabs";
import Empty from "../../../feedback/empty/Empty";
import Tab from "../../../navigation/tabs/Tab";
import SettingsField from "./SettingsField";

export default function Settings(props) {


    const [fields, setFields] = useState({
        hidden: props.keys.filter(f => !f.visible),
        visible: props.keys.filter(f => f.visible),
    })

    useEffect(() => {
        setFields({
            hidden: props.keys.filter(f => !f.visible),
            visible: props.keys.filter(f => f.visible),
        })
    }, [props])
    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={"slide-right"}
            blurIntensity={0}
            className={styles.modal}
        >
            <div className={styles.header}>
                Configurações
            </div>
            <Tabs
                className={styles.contentWrapper}
            >
                <Tab label={'Todos'} className={styles.content}>
                    {props.keys.map((e, i) => (
                        <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                            <SettingsField field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                        </React.Fragment>
                    ))}
                </Tab>
                <Tab label={'Visíveis'} className={styles.content}>
                    {fields.visible.length > 0 ?
                        fields.visible.map((e, i) => (
                            <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                <SettingsField field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                            </React.Fragment>
                        ))
                        :
                        <Empty customLabel={'Todos os campos estão escondidos'}/>
                    }
                </Tab>
                <Tab label={'Escondidos'} className={styles.content}>
                    {fields.hidden.length > 0 ?
                        fields.hidden.map((e, i) => (
                            <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                <SettingsField field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                            </React.Fragment>
                        ))
                        :
                        <Empty customLabel={'Todos os campos estão visíveis'}/>}
                </Tab>
            </Tabs>
        </Modal>
    )
}
Settings.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate),
    dispatchKeys: PropTypes.func,
    actions: PropTypes.object
}
