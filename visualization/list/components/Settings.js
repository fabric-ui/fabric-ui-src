import Modal from "../../../navigation/modal/Modal";
import PropTypes from 'prop-types'
import keyTemplate from "../templates/keyTemplate";
import styles from '../styles/Settings.module.css'
import TextField from "../../../inputs/text/TextField";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import ToolTip from "../../../feedback/tooltip/ToolTip";
import React, {useMemo} from 'react'
import Button from "../../../inputs/button/Button";
import Tabs from "../../../navigation/tabs/Tabs";
import Empty from "../../../feedback/empty/Empty";
import shared from '../../../misc/theme/Shared.module.css'
import Tab from "../../../navigation/tabs/Tab";

export default function Settings(props) {

    const getField = (field, index) => {
        return (
            <div className={shared.wrapper}>
                <div className={styles.fieldRow}>
                    <div className={styles.fieldLabel}>
                        {field.label}
                    </div>
                    <TextField
                        width={'100%'} size={'small'}

                        value={field.additionalWidth ? parseInt(field.additionalWidth.replace('%', '')) : ''}
                        maskEnd={'%'} label={'Largura adicional'}
                        placeholder={'Largura adicional'}
                        type={"number"} disabled={!field.visible}
                        handleChange={(event) => {

                            props.dispatchKeys({
                                type: props.actions.UPDATE_SIZE,
                                payload: {key: field.key, size: event.target.value + '%'}
                            })
                        }}
                    />

                    <Button
                        className={styles.visibilityButton}
                        color={field.visible ? 'secondary' : undefined}
                        onClick={() => {
                            console.log({
                                type: props.actions.UPDATE_VISIBILITY,
                                payload: {key: field.key}
                            })
                            props.dispatchKeys({
                                type: props.actions.UPDATE_VISIBILITY,
                                payload: field
                            })
                        }}>
                        {field.visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                        <ToolTip>
                            {field.visible ? 'Esconder' : 'Mostrar'}
                        </ToolTip>
                    </Button>
                </div>
            </div>
        )
    }

    const fields = useMemo(() => {
        return {
            hidden: props.keys.filter(f => !f.visible),
            visible: props.keys.filter(f => f.visible),
        }
    }, [props.keys])
    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={"slide-right"} blurIntensity={0}
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
                            {getField(e, i)}
                        </React.Fragment>
                    ))}
                </Tab>
                <Tab label={'Visíveis'} className={styles.content}>
                    {fields.visible.length > 0 ?
                        fields.visible.map((e, i) => (
                            <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                {getField(e, i)}
                            </React.Fragment>
                        ))
                        :
                        <Empty customLabel={'Todos os campos estão escondidos'}/>
                    }
                </Tab>
                <Tab label={'Escondidos'} className={styles.content}>
                    {
                        fields.hidden.length > 0 ?
                            fields.hidden.map((e, i) => (
                                <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                    {getField(e, i)}
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