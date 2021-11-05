import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import Button from "../../../../inputs/button/Button";
import ToolTip from "../../../../feedback/tooltip/ToolTip";
import Modal from "../../../modal/Modal";

const profileTemplate = {
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string
}
export default function Profile(props) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!props.profile || Object.keys(props.profile).length === 0)
            setOpen(false)
    }, [props.profile])
    return (
        <div
            className={styles.appsContainer}
        >
            {props.profile && Object.keys(props.profile).length > 0 ?
                <Button
                    className={styles.buttonContainer}
                    onClick={() => setOpen(!open)}
                    highlight={open}
                    styles={{
                        paddingLeft: '2px',
                        paddingRight: '2px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div style={{fontWeight: 'bold'}}>
                        Bem vindo
                    </div>

                    <div className={styles.overflowEllipsis} style={{maxWidth: '100%'}}>
                        {props.profile.name}
                    </div>
                    <Avatar style={{width: '30px', height: '30px'}} src={props.profile.image}/>
                    <ToolTip content={props.profile.name}/>
                </Button>
                :
                <Button
                    className={styles.buttonContainer}
                    onClick={() => props.fallbackProfileButton.onClick()}
                    styles={{
                        justifyContent: 'center',
                        minWidth: '100px',
                        gap: '8px'
                    }}
                >
                    <div>
                        {props.fallbackProfileButton.label}
                    </div>
                    {props.fallbackProfileButton.icon}
                </Button>
            }

            <Modal
                variant={'fit'}
                open={open}
                handleClose={() => setOpen(false)}
                blurIntensity={0}
                className={styles.floatingBox}
                animationStyle={'fade'}
            >
                <Button
                    className={styles.profileButton}
                    disabled={props.disabledProfile}
                    onClick={() => props.onProfileClick()}
                >

                    <Avatar style={{width: '50px', height: '50px'}} src={props.profile.image}/>
                    <ToolTip content={props.profile.name}/>
                    <div className={styles.overflowEllipsis} style={{maxWidth: '100%'}}>
                        {props.profile.name}
                        <div style={{fontWeight: 'normal'}}>
                            {props.profile.email}
                        </div>
                    </div>
                </Button>
                <div className={styles.divider}/>
                {props.registeredProfiles?.map((b, i) => (
                    <React.Fragment key={'registered-profile-button-' + i}>
                        <Button
                            className={styles.buttonContainer}

                            disabled={b.disabled}
                            onClick={() => b.onClick}
                            styles={{
                                width: '100%',
                                justifyContent: 'space-between',
                                height: '44px'
                            }}>
                            <Avatar style={{width: '30px', height: '30px'}} src={props.profile.image}/>
                            {b.name}
                        </Button>
                    </React.Fragment>
                ))}
                <div className={styles.divider}
                     style={{display: props.registeredProfiles && props.registeredProfiles.length > 0 ? undefined : 'none'}}/>
                {props.buttons.map((button, index) => !button ? null : (
                    <React.Fragment key={'profile-button-' + index}>
                        <Button
                            className={styles.buttonContainer}

                            disabled={button.disabled}
                            onClick={() => button.onClick()}
                            styles={{
                                width: '100%',
                                justifyContent: 'space-between',
                                height: '44px'
                            }}>

                            {button.icon}
                            <div className={styles.buttonLabel}> {button.label}</div>
                        </Button>
                    </React.Fragment>
                ))}
            </Modal>
        </div>
    )
}
Profile.propTypes = {
    onProfileClick: PropTypes.func,
    disabledProfile: PropTypes.bool,
    fallbackProfileButton: PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }),
    profile: PropTypes.shape(profileTemplate),
    registeredProfiles: PropTypes.arrayOf(PropTypes.shape({
        ...profileTemplate,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.any,
            onClick: PropTypes.func,
            disabled: PropTypes.bool
        })
    )
}
