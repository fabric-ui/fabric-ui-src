import styles from "./styles/Article.module.css";
import PropTypes from "prop-types";
import React, {useMemo, useRef} from "react";
import Button from "../../inputs/button/Button";

function copyToClipboard(element) {
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
}

const Wrapper = (props) => {
    if (props.type === 'code' || props.type === 'pre-formatted')
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
    contentRef: PropTypes.object
}
export default function TypeTag(props) {
    const ref = useRef()
    const content = useMemo(() => {
        switch (props.type) {
            case 'code':
                return (
                    <code ref={ref} className={styles.preFormattedText} >
                        {props.content}
                    </code>
                )
            case 'pre-formatted':
                return (
                    <pre ref={ref} className={styles.preFormattedText}>
                        {props.content}
                    </pre>
                )
            case 'image':
                return <img src={props.content} alt={'image-' + props.index} className={styles.image}
                            data-float={props.float}/>
            default:
                if (props.linkTo)
                    return (
                        <a className={styles.link} href={props.linkTo}>
                            {props.content}
                        </a>
                    )
                else
                    return (
                        <p className={styles.baseText} dangerouslySetInnerHTML={{__html: props.content}}
                           data-float={props.float}/>
                    )
        }
    }, [props])

    return (
        <Wrapper type={props.type} contentRef={ref.current} float={props.float}>
            {content}
        </Wrapper>
    )
}
TypeTag.propTypes = {
    content: PropTypes.any,
    type: PropTypes.oneOf(['text', 'code', 'pre-formatted', 'image']),
    index: PropTypes.number,
    float: PropTypes.oneOf(['right', 'left', 'stretch']),
    linkTo: PropTypes.string
}
