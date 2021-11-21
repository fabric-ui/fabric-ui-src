import React from 'react'
import styles from '../../code_block/styles/Markdown.module.css'
import htmlParser from "../../code_block/parsers/html";
import {BOLD_REGEX, INLINE_HEADER, ITALIC_REGEX, LIST_REGEX, RULE_REGEX} from "./regex";

const findBold = (line) => {
    let parsed = line
    try {
        BOLD_REGEX.forEach(r => {
            const match = parsed.match(r.baseRegex)

            parsed = parsed.replaceAll(r.baseRegex, `&REPLACEHERE&`)

            match?.forEach((m) => {
                parsed = parsed.replace('&REPLACEHERE&', `<b>${m.replaceAll(r.divider, '')}</b>`)
            })

        })
    } catch (e) {
        console.log(e)
    }
    return parsed.replaceAll('<b></b>', '')
}
const findItalic = (line) => {

    let parsed = line
    try {
        ITALIC_REGEX.forEach(r => {
            const match = parsed.match(r.baseRegex)

            parsed = parsed.replaceAll(r.baseRegex, `&REPLACEHERE&`)

            match?.forEach((m) => {
                parsed = parsed.replace('&REPLACEHERE&', `<i>${m.replaceAll(r.divider, '')}</i>`)
            })
        })
    } catch (e) {
        console.log(e)
    }
    return parsed.replaceAll('<i></i>', '')
}
const findLink = (line) => {
    let parsed = line
    return parsed
}
const findImage = (line) => {
    let parsed = line
    return parsed
}
const findInlineHeader = (line) => {
    let found = false
    let parsed = line
    try {
        Object.keys(INLINE_HEADER).forEach(k => {
            if (parsed.match(INLINE_HEADER[k]) !== null && found === false) {
                const split = parsed.split(INLINE_HEADER[k])

                if (split.length > 1)
                    parsed = `<h${k}>${split[1]}</h${k}>`

                found = true
            }
        })
    } catch (e) {
        console.log(e)
    }
    return parsed
}


const getType = (e) => {
    switch (true) {
        case e.match(LIST_REGEX.number) !== null:
            return 'number'
        case e.match(LIST_REGEX.plus) !== null:
            return 'plus'
        case e.match(LIST_REGEX.minus) !== null:
            return 'minus'
        case e.match(LIST_REGEX.asterisk) !== null:
            return 'asterisk'
        default:
            return null
    }
}

const findList = (lines) => {

    const getTag = (type) => {
        switch (type) {
            case 'number':
                return 'ol'
            default:
                return 'ul'
        }
    }

    const findNested = (startIndex) => {
        let nestedFound = []
        let lineAfterIsNested = false
        lines.forEach((line, index) => {
            if (index === startIndex + 1 && line.match(LIST_REGEX.nested) !== null)
                lineAfterIsNested = true
            if (line.match(LIST_REGEX.nested) === null) {
                lineAfterIsNested = false
            }
            if (index > startIndex && line.match(LIST_REGEX.nested) !== null && lineAfterIsNested) {
                nestedFound.push(line)
            }
        })

        return nestedFound
    }

    let listLines = [], type, lastList, lastType
    lines.forEach((e, index) => {
        type = getType(e)
        if(type === null ||  type !== lastType )
            lastList = undefined
        if (type !== null && e.match(LIST_REGEX.nested) === null) {
            lastType = type
            listLines.push({
                type: type,
                line: e,
                nested: findNested(index),
                linkedTo: lastList,
                index: index
            })
            lastList = index
        }

    })
    let parsed = []

    lines.forEach((e, index) => {
        const tag = getTag(e.type)
        const found = listLines.find(l => l.line === e)
        let forwardLinked
        if (found !== undefined) {
            if (found.index > 0)
                forwardLinked = listLines.findIndex(l => l.index > found.index && l.linkedTo === found.index)

            let parsedNested = found.nested.map(n => {
                return `<li class="${styles.listRow}">${n.replace(LIST_REGEX[e.type], '')}</li>`
            })
            if (parsedNested.length > 0)
                parsedNested = `\n<${tag} class="${styles.nestedList}">${parsedNested.join('\n')}</${tag}>\n`
            // console.log(forwardLinked, found)
            let str = `${forwardLinked === undefined || found.linkedTo === undefined? `<${tag} class="${styles.nestedList}">` : ''}<li class="${styles.listRow}">${found.line.replace(LIST_REGEX[found.type], '')}${parsedNested}</li>${forwardLinked === -1 ? `</${tag}>` : ''}`

            str.split('\n').forEach((s, sI) => {
                parsed.push({
                    index: index + sI,
                    line: s
                })
            })
        }
    })
    let newLines = [...lines]
    parsed.forEach(p => {
        newLines[p.index] = p.line
    })


    return newLines
}
const findRule = (lineBefore, line, lineAfter) => {
    let parsed = line

    if ((lineBefore === null || lineBefore.match(RULE_REGEX.emptyLine) === null || RULE_REGEX.underline.test(line.trim())) && (lineAfter === null || lineAfter.match(RULE_REGEX.emptyLine) === null || RULE_REGEX.underline.test(line.trim())) && RULE_REGEX.base.test(line.trim())) {

        parsed = `<div class=${styles.divider}></div>`
    }

    return parsed
}
const findQuote = (line, callbackIndex) => {
    const innerRegex = callbackIndex !== undefined && callbackIndex > 0 ? /\s>\s(.+)/gi : /^>\s/gi
    let parsed = line

    try {
        const split = parsed.split(innerRegex)
        if (split.length > 1)
            parsed = `<section data-layer="${callbackIndex !== undefined ? 'true' : 'false'}" class="${styles.quote}">${findQuote(findQuote(split[1], callbackIndex !== undefined ? callbackIndex + 1 : 1), 0)}</section>`
    } catch (e) {
        console.log(e, 'QUOTE ERROR')
    }

    return parsed
}
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
            const beforeLink = newLine
            newLine = findLink(newLine)
            if (beforeLink === newLine)
                newLine = findImage(newLine)

            const beforeHeader = newLine
            newLine = findInlineHeader(newLine)
            if (beforeHeader === newLine)
                newLine = findQuote(newLine)
            newLine = findRule(index > 0 ? split[index - 1] : null, newLine, index < split.length - 1 ? split[index + 1] : null)

            if (beforeHeader === newLine && getType(newLine) === null)
                newLine = startParagraph(newLine)
            parsedData.push(newLine)

        })

        parsedData = findList(parsedData, data.split('\n'))
    } catch (e) {
        console.log(e)
    }

    return parsedData.join('\n')
}
