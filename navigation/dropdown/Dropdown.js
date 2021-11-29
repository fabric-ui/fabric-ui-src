import React, {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import styles from './styles/Dropdown.module.css'
import Button from "../../inputs/button/Button";
import Modal from "../modal/Modal";

export default function Dropdown(props) {
    const [open, setOpen] = useState(false)
    const [width, setWidth] = useState(undefined)
    const [height, setHeight] = useState(undefined)
    const ref = useRef()
    const resizeObs = useRef()
    const callback = () => {
        setWidth(ref.current?.offsetWidth)
        setHeight(ref.current?.offsetHeight)
    }
    useEffect(() => {
        setWidth(ref.current?.offsetWidth)
        setHeight(ref.current?.offsetHeight)
        resizeObs.current = new ResizeObserver(callback)

        resizeObs.current?.observe(ref.current)
        return () => {
            resizeObs.current?.disconnect();
        }
    }, [])

    const justifyTranslation = useMemo(() => {
        if (width !== undefined)
            switch (props.justify) {
                case 'end':
                    return `calc(-50% + ${width / 2}px)`
                case 'start':
                    return  `calc(50% - ${width / 2}px)`
                case 'middle':
                    return  '0%'
                default:
                    return '0%'
            }
        else
            return '0%'
    }, [width, props.justify])

    const alignTranslation = useMemo(() => {

        if (height !== undefined)
            switch (props.align) {
                case 'top':
                    return `calc(-50% - ${height / 2}px)`
                case 'bottom':
                    return  `calc(50% + ${height / 2}px)`
                case 'middle':
                    return  '0%'
                default:
                    return '0%'
            }
        else
            return '0%'
    }, [height, props.align])
    console.log(alignTranslation)
    return (
        <div className={styles.wrapper}>
            <Button
                highlight={open || props.highlight}
                reference={ref} styles={props.styles}
                variant={props.variant} color={props.color} onClick={() => setOpen(true)}
                disabled={props.disabled}
                className={props.className}>
                {props.children}
            </Button>
            <Modal
                variant={"fit"}
                styles={{transform: `translate(${justifyTranslation}, ${alignTranslation})`}}
                blurIntensity={0} className={styles.buttons}
                animationStyle={'fade'}
                open={open}
                handleClose={() => setOpen(false)}>
                {props.options?.map((b, i) => (
                    <React.Fragment key={'select-' + i}>
                        <Button
                            disabled={b.disabled}
                            onClick={() => {
                                b.onClick(b.onClickEvent)
                                setOpen(false)
                            }}
                            className={styles.button}>
                            {b.icon}
                            <div className={styles.buttonLabel}>
                                {b.label}
                            </div>
                        </Button>
                    </React.Fragment>
                ))}
            </Modal>
        </div>
    )
}

Dropdown.propTypes = {
    highlight: PropTypes.bool,
    variant: PropTypes.oneOf(['minimal', 'filled', 'outlined', 'minimal-horizontal']),
    className: PropTypes.string,
    styles: PropTypes.object,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'secondary']),

    children: PropTypes.node,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        onClickEvent: PropTypes.any
    })),

    align: PropTypes.oneOf(['top','middle', 'bottom']),
    justify: PropTypes.oneOf(['start','middle', 'end'])
}
