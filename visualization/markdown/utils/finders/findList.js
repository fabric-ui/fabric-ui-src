import {LIST_REGEX} from "../regex";
import styles from "../../styles/Markdown.module.css";
export function getType (e) {
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

export default function findList (lines) {

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