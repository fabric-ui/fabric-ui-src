import React, {useContext, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles/FileField.module.css'
import shared from '../../misc/theme/Shared.module.css'
import LocalePT from '../shared/LocalePT'
import FileModal from "./templates/FileModal";
import ThemeContext from "../../misc/theme/ThemeContext";
import Button from "../button/Button";
import ToolTip from "../../feedback/tooltip/ToolTip";

export default function FileField(props) {
    const lang = LocalePT

    const [openModal, setOpenModal] = useState(false)

    const color = useMemo(() => {
        if (props.colorVariant === 'secondary')
            return {
                className: shared.secondaryVariant,
                color: '#0095ff'
            }
        else return {
            className: undefined,
            color: '#0095ff'
        }

    }, [])

    const files = useMemo(() => {
        if (props.value && Array.isArray(props.value))
            return props.value
        else
            return []
    }, [props.value])

    const themes = useContext(ThemeContext)
    return (
        <div style={{
            width: props.width,
            marginBottom: 'auto',
            display: "grid",
            gap: '4px'
        }}>

            <div className={shared.labelContainer}
                 style={{
                     opacity: files.length > 0 ? 1 : 0,
                     transition: 'visibility 0.2s ease,opacity 0.2s ease'
                 }}>
                <div className={shared.overflow}>
                    {props.label}
                </div>
                {props.helperText ?
                    <div className={shared.helperText}>
                       <span
                           style={{fontSize: '1rem'}}
                           className="material-icons-round">info</span>

                        <ToolTip content={props.helperText} align={'start'}/>
                    </div>
                    :
                    null
                }
            </div>
            <div
                className={[shared.wrapper, color.className].join(' ')}
                data-highlight={openModal ? openModal : undefined}
                data-disabled={props.disabled ? props.disabled : undefined}
            >
                <Button
                    disabled={props.disabled}
                    variant={'outlined'}
                    highlight={openModal}
                    styles={{
                        height: props.size === 'small' ? '36px' : '56px',
                        overflow: "hidden", maxWidth: 'unset', marginTop: 'unset'
                    }} color={props.colorVariant === 'secondary' ? 'secondary' : 'primary'}
                    className={[styles.button, shared.labelContainer].join(' ')}
                    onClick={() => setOpenModal(true)}
                >
                    <div
                        className={shared.labelContainer}
                        style={{
                            alignItems: 'center',
                            height: '100%',
                            gap: '16px',
                            display: 'flex',
                            color: themes ? themes.themes.color1 : '#555555'
                        }}
                    >
                        Anexar arquivos
                        {files.length > 0 ?
                            <div style={{
                                fontSize: '.7rem',
                                color: themes ? themes.themes.color2 : '#777777'
                            }}>
                                ({files.length} Anexados)
                            </div>
                            :
                            null}
                    </div>
                    <span
                        style={{fontSize: '1.2rem'}}
                        className="material-icons-round">attach_file</span>

                </Button>
            </div>
            <div className={shared.alertLabel}
                 style={{
                     color: (files.length === 0) ? '#ff5555' : undefined,
                     visibility: props.required ? 'visible' : 'hidden'
                 }}>{lang.required}</div>

            <FileModal open={openModal} setOpen={setOpenModal} files={files} multiple={props.multiple}
                       setFiles={props.handleChange}
                       accept={props.acceptTypes && Array.isArray(props.acceptTypes) ? props.acceptTypes : []}
                       handleFileRemoval={props.handleFileRemoval}/>
        </div>
    )
}

FileField.propTypes = {
    helperText: PropTypes.string,

    handleFileRemoval: PropTypes.func,
    value: PropTypes.array,
    multiple: PropTypes.bool,
    acceptTypes: PropTypes.array,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    width: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,

    size: PropTypes.oneOf(['small', 'default']),
    colorVariant: PropTypes.oneOf(['default', 'secondary', 'primary'])
}
