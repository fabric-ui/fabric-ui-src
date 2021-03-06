import PropTypes from "prop-types";
import React, {useContext, useEffect, useMemo, useState} from "react";
import styles from "./styles/Modal.module.css";
import ThemeContext from "../../misc/context/ThemeContext";
import useModal from "./hooks/useModal";

export default function Modal(props) {

    const {animations, renderContent, animate, unmountContent, target, source, getParentPosition} = useModal({
        animationStyle: props.animationStyle,
        variant: props.variant
    })
    const context = useContext(ThemeContext)

    const handleMouseDown = (event) => {
        if (!document.elementsFromPoint(event.clientX, event.clientY).includes(target.current) && alreadyRendered)
            props.handleClose()
    }
    const [alreadyRendered, setAlreadyRendered] = useState(false)

    useEffect(() => {

        if (props.open) {
            const position = getParentPosition()

            renderContent((
                <div
                    style={{
                      ...props.variant === 'fit' ? {} : {backdropFilter: `blur(${props.blurIntensity ? props.blurIntensity : '10px'})`},
                      ...position,
                      ...context.themes
                    }}
                    className={[styles.wrapper, props.variant === 'fit' ? styles.fitContent : styles.fitPage, props.wrapperClassName, context.dark ? context.styles.dark : context.styles.light].join(' ')}
                >
                    <div
                        className={[alreadyRendered ? undefined : animations.enter, props.className].join(' ')}
                        style={props.styles}
                        ref={target}
                        onAnimationEnd={e => {
                            if (!alreadyRendered)
                                setAlreadyRendered(true)
                            if (e.target.classList.contains(animations.exit)) {
                                setAlreadyRendered(false)
                                props.handleClose()

                                unmountContent()
                            }
                        }}>
                        {props.children}
                    </div>
                </div>
            ))

        } else if (alreadyRendered)
            animate()
    }, [props.children, props.open])

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [alreadyRendered, props.open, props.children])

    return <div ref={source} style={{display: 'none'}}/>
}

Modal.propTypes = {
    wrapperClassName: PropTypes.string,
    variant: PropTypes.oneOf(['fill', 'fit']),
    animationStyle: PropTypes.oneOf(['slide-left', 'slide-right', 'fade', 'slide-bottom']),
    className: PropTypes.string,
    blurIntensity: PropTypes.string,
    styles: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node
}
