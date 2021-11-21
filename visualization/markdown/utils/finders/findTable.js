import {TABLE_REGEX} from "../regex";
import styles from '../../styles/Markdown.module.css'

const removeLimiters = (str) => {
    return str.split('| ').filter(s => s !== '| ').join('').split(' |').filter(s => s !== ' |').join('')
}
export default function findTables(lines) {
    let headers = []
    let columns = []
    let listStarted, columnsStarted
    let tables = []
    lines.forEach((l, index) => {
        if (index < (lines.length - 1) && l.match(TABLE_REGEX.contentRow) !== null && lines[index + 1].match(TABLE_REGEX.divider) !== null) {
            listStarted = index
            headers.push(l)
            columnsStarted = index + 1
        } else if (index < lines.length - 1 && columnsStarted !== undefined && index >= columnsStarted && l.match(TABLE_REGEX.contentRow) !== null)
            columns.push(l)
        else if ((l.match(TABLE_REGEX.divider) === null || index === lines.length - 1) && listStarted !== undefined) {
            if (index === lines.length - 1)
                columns.push(l)
            tables.push({
                startsOn: listStarted,
                headers: headers,
                columns: columns
            })

            headers = []
            columns = []
            listStarted = undefined
            columnsStarted = undefined
        }
    })
    let parsedLines = [...lines]
    let linesRemoved = 0
    tables.forEach(t => {
        const tableLength = (t.columns.length + t.headers.length) + 1

        let splitColumns = t.columns.map(c => c.split(' | '))
        splitColumns = splitColumns.map(c => `<tr class="${styles.tableRow}">${c.map(cc => `<td class="${styles.tableContent}">${removeLimiters(cc)}</td>`).join('')}</tr>`).join('')

        let splitHeaders = t.headers.map(c => c.split(' | '))
        splitHeaders = splitHeaders.map(c => `<tr class="${styles.tableRow}">${c.map(cc => `<th class="${styles.tableContent}">${removeLimiters(cc)}</th>`).join('')}</tr>`).join('')

        parsedLines.splice(t.startsOn - linesRemoved, tableLength)
        linesRemoved += tableLength

        parsedLines[t.startsOn] = `<table class="${styles.tableWrapper}">${splitHeaders}\n${splitColumns}</table>`
    })
    // console.log(parsedLines.join('\n'))
    return parsedLines
}