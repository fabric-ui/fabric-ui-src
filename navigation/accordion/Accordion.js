import {useEffect, useRef, useState} from "react";
import styles from "./styles/Accordion.module.css";
import {ArrowDropDownRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

export default function Accordion(props) {
    const [open, setOpen] = useState(true)
    const contentRef = useRef()
    const ref = useRef()

    useEffect(() => {
        if (open) {
            ref.current.style.height = (contentRef.current.offsetHeight + 75) + 'px'
        } else
            ref.current.style.height = '50px'
    }, [open])

    return (
        <div className={styles.elementsContainer} ref={ref}
             style={{background: open ? 'white' : undefined}}>
            <div className={styles.optionsDivider} onClick={() => setOpen(!open)}>
                <ArrowDropDownRounded style={{
                    transform: open ? `rotate(180deg)` : undefined,
                    fontSize: '1.3rem',
                    color: '#777777',
                    transition: '150ms linear'
                }}/>
                {props.label}
            </div>
            <div style={{
                visibility: !open ? 'hidden' : 'visible',
                opacity: !open ? '0' : '1',
                transform: !open ? 'translateY(calc(-100% - 18px))' : 'translateY(0)',
                transition: '150ms linear',
                position: 'relative',
                zIndex: 0
            }} ref={contentRef}>
                {props.children}
            </div>
        </div>
    )
}
Accordion.propTypes = {
    label: PropTypes.string,
}
