import styles from "./styles/Article.module.css";
import PropTypes from "prop-types";
import React, {useMemo, useRef} from "react";
import Wrapper from "../code_block/Wrapper";


export default function TypeTag(props) {
    const ref = useRef()
    const content = useMemo(() => {

        switch (props.type) {
            case 'any':
                return props.content
            case 'pre-formatted':
                return (
                    <pre ref={ref} className={styles.preFormattedText}>
                        {props.content}
                    </pre>
                )
            case 'native-code':
                return (
                    <div className={styles.nativeCode}>
                        {props.content}
                    </div>
                )

            case 'image':
                return (
                    <img
                        src={props.content}
                        alt={'image-' + props.index}
                        className={styles.image}
                        data-float={props.float}
                    />
                )
            default: {
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
        }
    }, [props.content])

    return (
        content
    )
}
TypeTag.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf(['any', 'native-code', 'pre-formatted', 'text', 'image']),
    index: PropTypes.number,
    float: PropTypes.oneOf(['right', 'left', 'stretch']),
    linkTo: PropTypes.string,
    noCopy: PropTypes.bool
}