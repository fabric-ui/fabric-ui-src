import React from 'react'
import styles from '../styles/Markdown.module.css'
import {RULE_REGEX, TABLE_REGEX} from "./regex";
import findList, {getType} from "./finders/findList";
import findQuote from "./finders/findQuote";
import {findBold, findItalic} from "./finders/findTypeface";
import {findInlineHeader} from "./finders/findHeader";
import {findRule} from "./findRule";
import findTables from "./finders/findTable";
import {findImage, findLink} from "./finders/findExternalSource";



const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}

export default function markdownParser(data) {
    let parsedData = []
    try {
        const split = data.split('\n')
        split.forEach((line, index) => {
            let newLine = findBold(line)
            newLine = findItalic(newLine)

            newLine = findImage(newLine)
            newLine = findLink(newLine)

            const beforeHeader = newLine
            newLine = findInlineHeader(newLine)
            if (beforeHeader === newLine)
                newLine = findQuote(newLine)
            newLine = findRule(index > 0 ? split[index - 1] : null, newLine, index < split.length - 1 ? split[index + 1] : null)

            if (beforeHeader === newLine && getType(newLine) === null && newLine.match(RULE_REGEX.emptyLine) !== null && newLine.match(TABLE_REGEX.allRows) === null) {
                newLine = startParagraph(newLine)

            }



            parsedData.push(newLine)

        })

        parsedData = findList(parsedData, data.split('\n'))
        parsedData = findTables(parsedData, data.split('\n'))
    } catch (e) {
        console.log(e)
    }

    return parsedData.join('\n')
}
