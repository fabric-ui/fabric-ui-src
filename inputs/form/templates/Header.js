import styles from "../styles/Form.module.css";
import React from "react";
import PropTypes from "prop-types";
import Button from "../../button/Button";
import useLocale from "../../../misc/hooks/useLocale";

export default function Header(props) {
    const translate = useLocale()

    return (
        <div className={styles.header} style={{boxShadow: props.scrolled ? undefined : 'none'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className={styles.headerContent}>
                    <Button className={styles.buttonContainer} color={'secondary'}
                            styles={{display: props.returnButton ? undefined : 'none'}}
                            onClick={() => props.handleClose()}>
                        <span
                            className="material-icons-round">arrow_back</span>

                    </Button>
                    {props.title}
                </div>

                <div className={styles.headerContent}>
                    <Button
                        className={styles.submitButton} disabled={props.disabled}
                        variant={'filled'}

                        onClick={() => {
                            props.hook.setChanged(false)
                            props.handleSubmit(props.hook.data, props.hook.clearState)
                        }}>
                        {props.submitLabel ? props.submitLabel : (props.create ? translate('create') : translate('save'))}
                    </Button>
                </div>
            </div>
            <div className={styles.buttons}
                 style={{display: !props.options || props.options.length === 0 ? 'none' : undefined}}>
                {props.options?.map((b, index) => (
                    <React.Fragment key={index + '-option-button'}>
                        <div className={styles.divider} style={{display: index === 0 ? 'none' : undefined}}/>
                        <Button
                            align={'bottom'} variant={'minimal'}
                            className={styles.buttonContainer}
                            disabled={b.disabled}
                            onClick={b.onClick}
                        >
                            {b.icon}
                            {b.label}
                        </Button>
                    </React.Fragment>

                ))}
            </div>
        </div>
    )
}

Header.propTypes = {
    scrolled: PropTypes.bool,

    disabled: PropTypes.bool,
    returnButton: PropTypes.bool,
    title: PropTypes.string,
    hook: PropTypes.object.isRequired,
    create: PropTypes.bool,
    dependencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date', 'array'])
    })),
    handleSubmit: PropTypes.func.isRequired,
    metadata: PropTypes.shape({
        lastModified: PropTypes.any,
        creator: PropTypes.any,
    }),
    handleClose: PropTypes.func,
    submitLabel: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.any, label: PropTypes.string, onClick: PropTypes.func,
        disabled: PropTypes.bool
    }))
}
