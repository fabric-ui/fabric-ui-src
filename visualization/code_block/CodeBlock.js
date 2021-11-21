import React, {useCallback, useMemo, useState} from 'react'

import PropTypes from "prop-types";
import useCode from "./utils/useCode";
import Wrapper from "./Wrapper";
import JavascriptCode from "./wrappers/JavascriptCode";
import JsonCode from "./wrappers/JsonCode";
import Markdown from "../markdown/Markdown";

export default function CodeBlock(props) {
    const parsedString = useCode(props.data, props.language)

    const [extended, setExtended] = useState(false)

    const getLanguage = (prop) => {
        switch (props.language){
            case "javascript":
                return JavascriptCode(prop)
            case "json":
                return JsonCode(prop)

            default:
                return
        }
    }
    return (
        <Wrapper
            width={props.width}
            options={props.language === 'javascript' ? [{
                    icon: (
                        <span className="material-icons-round" style={{fontSize: '1rem'}}>code</span>
                    ),
                    onClick: () => setExtended(!extended),
                    label: 'Show code',
                    color: extended ? 'secondary' : 'primary'
                }]
                :
                []}>
            {(copyContent) => getLanguage({...parsedString, setCopy: copyContent, extended: extended})}
        </Wrapper>
    )
}
CodeBlock.propTypes = {
    width: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    language: PropTypes.oneOf(['json', 'javascript']).isRequired
}
