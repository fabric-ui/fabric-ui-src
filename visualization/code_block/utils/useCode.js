import React, {useMemo} from 'react'
import jsonParser from "../parsers/json";
import jsxParser from "../parsers/jsx";
import javascriptParser from "../parsers/javascript";
import markdownParser from "../parsers/markdown";

export default function useCode(data, language) {
    return useMemo(() => {
        switch (language) {
            case 'json':
                return jsonParser(data)
            case 'javascript':
                return javascriptParser(data)
            // case 'jsx':
            //     return jsxParser(data)
            case 'markdown':
                return markdownParser(data)
            default:
                return;
        }

    }, [language, data])
}
