import styles from "./styles/Article.module.css";
import PropTypes, {bool} from "prop-types";
import React, {useMemo, useRef} from "react";
import Button from "../../inputs/button/Button";
import enumerateLines from "../../misc/parser/enumerateLine";
import jsxToString from "../../misc/parser/jsxToString";
import Wrapper from "./Wrapper";


export default function TypeTag(props) {
    const ref = useRef()
    const content = useMemo(() => {
        switch (props.type) {
            case 'native-code':
                return (
                    <div className={styles.preFormattedText}>
                        {props.content}
                    </div>
                )
            case 'code' :
                return (

                    <code ref={ref} className={styles.preFormattedText} style={{
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        tabSize: 8
                    }}
                          dangerouslySetInnerHTML={React.isValidElement(props.content) ? {__html: enumerateLines(jsxToString(props.content))} : undefined}>
                        {React.isValidElement(props.content) ? undefined : props.content}
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
    }, [props.content])

    return (
        <Wrapper type={props.type} contentRef={ref.current} float={props.float} noCopy={props.noCopy}>
            {content}
        </Wrapper>
    )
}
TypeTag.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf(['native-code', 'text', 'code', 'pre-formatted', 'image']),
    index: PropTypes.number,
    float: PropTypes.oneOf(['right', 'left', 'stretch']),
    linkTo: PropTypes.string,
    noCopy: PropTypes.bool
}