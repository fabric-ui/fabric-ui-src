import styles from "./styles/Article.module.css";
import Button from "../../inputs/button/Button";
import PropTypes from "prop-types";
import React from "react";

function copyToClipboard(element) {
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
}


export default function Wrapper (props) {
    if ((props.type === 'code' || props.type === 'pre-formatted') && !props.noCopy)
        return (
            <div className={styles.clipboardWrapper} data-float={props.float ? props.float : 'none'}>
                <Button variant={"filled"} onClick={() => {
                    copyToClipboard(props.contentRef)
                }} className={styles.button}>
                        <span className="material-icons-round" style={{fontSize: '1.2rem'}}>
                            content_copy
                        </span>
                </Button>
                {props.children}
            </div>
        )
    else
        return props.children
}
Wrapper.propTypes = {
    float: PropTypes.oneOf(['right', 'left', 'stretch']),
    children: PropTypes.node,
    type: PropTypes.oneOf(['text', 'code', 'pre-formatted', 'image']),
    contentRef: PropTypes.object,
    noCopy: PropTypes.bool
}