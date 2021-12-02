import React, {useEffect, useMemo, useRef} from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";

export default function useModal({animationStyle, variant}) {
    const mountingPoint = useRef()
    const source = useRef()
    const target = useRef()
    const animation = useMemo(() => {
        let anim = {
            enter: styles.enterFade,
            exit: styles.exitFade,
        }

        switch (animationStyle) {
            case 'slide-left': {
                anim = {
                    enter: styles.slideLeftEnter,
                    exit: styles.slideLeftExit,
                }
                break
            }

            case 'slide-right': {
                anim = {
                    enter: styles.slideRightEnter,
                    exit: styles.slideRightExit,
                }
                break
            }
            case 'slide-bottom': {
                anim = {
                    enter: styles.slideBottomEnter,
                    exit: styles.slideBottomExit,
                }
                break
            }

            default:
                break

        }
        return anim
    }, [])

    const unmountContent = () => {

        try {
            ReactDOM.unmountComponentAtNode(mountingPoint.current)
        } catch (e) {
        }
    }

    const renderContent = (content) => {
        ReactDOM.render(content, mountingPoint.current)
    }

    const animate = (enter) => {
        if (enter)
            target.current?.classList.add(animation.enter)
        else {
            target.current?.classList.remove(animation.enter)
            target.current?.classList.add(animation.exit)
        }
    }
    const mount = () => {
        mountingPoint.current = document.createElement('div')
        document.body.appendChild(mountingPoint.current)
        mountingPoint.current.style.position = 'fixed'
        mountingPoint.current.style.zIndex = 999
    }
    useEffect(() => {
        mount()
        return () => {
            unmountContent()
        }
    }, [])
    const getParentPosition = () => {
        const bBox = source.current?.parentNode?.getBoundingClientRect()

        if (bBox && variant === 'fit') {
            return {
                top: (bBox.top + bBox.height / 2) + 'px',
                left: (bBox.left + bBox.width / 2) + 'px',
                transform: 'translate(-50%, -50%)'
            }
        } else
            return {}
    }
    return {animations: animation, renderContent, animate, unmountContent, target, source, getParentPosition}
}
