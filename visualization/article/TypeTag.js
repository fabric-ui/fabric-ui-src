import styles from "./styles/Article.module.css";
import PropTypes, {bool} from "prop-types";
import React, {useMemo, useRef} from "react";
import Button from "../../inputs/button/Button";

function copyToClipboard(element) {
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
}

const jsxToString = (component) => {
    if (component.type === React.Fragment && component.props.children && component.props.children.length > 0) {
        let data = ''
        component.props.children.forEach(child => {
            data = data + '\n' + jsxToString(child)
        })
        console.log(data)
        return data
    } else
        try {
            let type = component.type?.name;
            let props = component.props;
            let propsString = "";
            let childrenNode = ''
            for (let key in props) {
                let propValue = props[key];
                if (key !== "children" && typeof propValue !== 'function' && typeof propValue !== 'boolean') {

                    let value = "";
                    if (propValue instanceof Object) {
                        value = `{${JSON.stringify(propValue).replace(/['"]+/g, '')}}`;
                    } else {
                        value = `"${propValue}"`;
                    }
                    propsString += ` <b style="color: #0095ff">${key}=</b><i style="color: #007d07">${value}</i>`;
                }else if (typeof props[key] === 'function')
                    propsString += ` <b style="color: #0095ff">${key}=</b><i style="color: #FFBF00">${key}</i>`;
                else if (typeof propValue === 'boolean')
                    propsString += ` <b style="color: #0095ff">${key}=</b><i style="color: #FF1500">${propValue}</i>`;
            }
            if (props.children)
                childrenNode = jsxToString(props.children)

            if(type)
                return props.children ?
                    `&lt;<b style="color:#86128f;">${type}</b>${propsString}&gt;` + '\n   ' + childrenNode + '\n' + `&lt;/<b style="color:#86128f;">${type}</b>&gt;`
                    :
                    `&lt;<b style="color:#86128f;">${type}</b>${propsString}/&gt;`;
            else
                return childrenNode
        } catch (e) {
            return component
        }
}



const Wrapper = (props) => {
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
                          dangerouslySetInnerHTML={React.isValidElement(props.content) ? {__html: jsxToString(props.content)} : undefined}>
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
    }, [props])

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