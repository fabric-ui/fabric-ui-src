import React from 'react'
import styles from '../styles/Markdown.module.css'
import htmlParser from "./html";

const findBold = (line) => {
    const regex = [
        {
            baseRegex: /__[^_]*__/gi,
            divider: /__/gi
        },
        {
            baseRegex: /\*\*[^*]*\*\*/gi,
            divider: /\*\*/gi
        }]
    let parsed = line
    try {
        regex.forEach(r => {
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
    const regex = [
        {
            baseRegex: /_[^_]*_/gi,
            divider: /_/gi
        },
        {
            baseRegex: /\*[^*]*\*/gi,
            divider: /\*/gi
        }]
    let parsed = line
    try {
        regex.forEach(r => {
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
    const HEADERS = {
        1: /^#\s/gi,
        2: /^##\s/gi,
        3: /^###\s/gi,
        4: /^####\s/gi,
        5: /^#####\s/gi,
        6: /^######\s/gi
    }
    let found = false
    let parsed = line
    try {
        Object.keys(HEADERS).forEach(k => {
            if (HEADERS[k].test(parsed) && found === false) {
                const split = parsed.split(HEADERS[k])
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

const REGEX = {
    number: /^[0-9]+\. | {3}[0-9]+\. /gi,
    asterisk: /^\* | {3}\* /gi,
    minus: /^- | {3}- /gi,
    plus: /^\+ | {3}\+ /gi
}

const getType = (e) => {
    switch (true) {
        case e.match(REGEX.number) !== null:
            return 'number'
        case e.match(REGEX.plus) !== null:
            return 'plus'
        case e.match(REGEX.minus) !== null:
            return 'minus'
        case e.match(REGEX.asterisk) !== null:
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
    let lists = []
    let listStated, type, nestedLines = []
    lines.forEach((e, index) => {
        type = getType(e)


        if (listStated !== undefined && /^\s{3}(.+)/gi.test(e)) {
            nestedLines.push(e)
        }
        if (type !== null && listStated === undefined) {
            listStated = {
                type: type,
                index: index
            }
        }

        if (listStated !== undefined && (type !== listStated.type || !/\S/.test(e))) {

            lists.push({
                type: listStated.type,
                starts: listStated.index,
                ends: index,
                nestedLines: nestedLines
            })

            nestedLines = []
            listStated = undefined
        }
    })
    let parsed = []
    lists.forEach((e, index) => {

        const tag = getTag(e.type)
        let str = [...lines].splice(e.starts, e.ends - e.starts).join('\n')
        let listRows = str.replace(REGEX[e.type], '').split('\n')

        let originalRows = str.split('\n')

        listRows = listRows.map((row, rowIndex) => {

            if (e.nestedLines.indexOf(originalRows[rowIndex]) > -1)
                return `<${tag} class="${styles.nestedList}"><li class="${styles.listRow}">${row.replace(REGEX[e.type], '')}</li></${tag}>`
            else
                return `<li class="${styles.listRow}">${row.replace(REGEX[e.type], '')}</li>`
        })
        // console.log(listRows)
        listRows = listRows.join('\n')

        let before = [], after = ''
        if (index > 0) {
            [...lines].forEach((h, i) => {
                if (i >= lists[index].starts && i <= e.ends)
                    before.push(h)
            })

            before = before.join('')
        } else if (index === 0)
            before = [...lines].splice(0, e.starts).join('')

        if (index === lists.length - 1)
            after = [...lines].splice(e.ends, lines.length).join('')
        const toRemove = str.split('\n')

        toRemove.forEach(r => {
            before = before.replace(r, '')
        })

        parsed.push(before + `<${tag} class="${styles.list}">${listRows}</${tag}>` + after)
    })

    return parsed
}
const findRule = (lineBefore, line, lineAfter) => {
    let parsed = line

    if ((lineBefore === null || (/\s+|\S/g).test(lineBefore) || /^_+$|^_$/gi.test(line.trim())) && (lineAfter === null || (/\s+|\S/g).test(lineAfter) || /^_+$|^_$/gi.test(line.trim())) && /^-+$|^-$|^\*+$|^\*$|^_+$|^_$/gi.test(line.trim()))
        parsed = `<div class=${styles.divider}></div>`


    return parsed
}
const findQuote = (line, callbackIndex) => {
    const innerRegex = callbackIndex !== undefined && callbackIndex > 0 ? /\s>\s(.+)/gi : /^>\s/gi
    let parsed = line

    try {
        const split = parsed.split(innerRegex)
        if (split.length > 1)
            parsed = `<section data-layer="${callbackIndex !== undefined ? 'true' : 'false'}" class="${styles.quote}">${findQuote(findQuote(split[1], callbackIndex !== undefined ? callbackIndex + 1 :1), 0 )}</section>`
    } catch (e) {
        console.log(e)
    }

    return parsed
}
const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}
export default function markdownParser(data) {
    let parsedData = []
    try {
        data.split('\n').forEach((line, index) => {
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

            newLine = findRule(index > 0 ? data[index - 1] : null, newLine, index < data.length - 1 ? data[index + 1] : null)

            if (beforeHeader === newLine && getType(line) === null)
                newLine = startParagraph(newLine)
            parsedData.push(newLine)

        })

        parsedData = findList(parsedData, data.split('\n'))
    } catch (e) {
        console.log(e)
    }

    return {
        parsedData: parsedData.join('\n')
    }
}
