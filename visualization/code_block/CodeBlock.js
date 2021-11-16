import React, {useState} from 'react'

import PropTypes from "prop-types";
import useCode from "./utils/useCode";
import Wrapper from "./Wrapper";
import JavascriptCode from "./wrappers/JavascriptCode";
import JsonCode from "./wrappers/JsonCode";

export default function CodeBlock(props) {
    const parsedString = useCode(props.data, props.language)

    const [extended, setExtended] = useState(false)
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
            {(copyContent) => (
                props.language === 'javascript' ?
                    JavascriptCode({...parsedString, setCopy: copyContent, extended: extended})
                    :
                    JsonCode({ setCopy: copyContent, data: props.data,parsedData: parsedString})
            )}
        </Wrapper>
    )
}
CodeBlock.propTypes = {
    width: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    language: PropTypes.oneOf(['json', 'jsx', 'javascript']).isRequired
}
