import {CODE_BLOCK} from "../regex";
import styles from '../../styles/Markdown.module.css'
import javascriptParser from "../parsers/javascript";
import jsonParser from "../parsers/json";
import consoleParser from "../parsers/console";
import htmlParser from "../parsers/html";

function identifyType(str, clean) {
    let parsedClean = clean.split('\n')
    parsedClean = parsedClean.map(p => {
        return `&nbsp;${p}`
    })

    parsedClean = parsedClean.join('\n')

    parsedClean = parsedClean.replaceAll(/'/g, '&quot;')
    parsedClean = parsedClean.replaceAll(/"/g, '&quot;')
    parsedClean = parsedClean.replaceAll(/´/g, '&quot;')

    switch (true) {
        case str.match(CODE_BLOCK.TYPES.jsx) !== null:
            return javascriptParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.javascript) !== null:
            return javascriptParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.json) !== null:
            return jsonParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.console) !== null:
            return consoleParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.html) !== null:
            return htmlParser(parsedClean)

        default:
            return parsedClean
    }
}

export default function findCode(str) {
    const match = str.match(CODE_BLOCK.BASIC)
    let parsed = str

    if (match !== null)
        match.forEach(e => {
            let parsedBlock = identifyType(e, e.match(CODE_BLOCK.NOT_GLOBAL)[1])
            parsedBlock = parsedBlock.split('\n')

            parsedBlock = parsedBlock.map((p, i) => {
                return `<span class="${styles.lineEnumeration}">${i}</span>${'&nbsp'.repeat(Math.ceil(parsedBlock.length * .1))}|${p}`
            })
            parsed = parsed.replace(CODE_BLOCK.NOT_GLOBAL, `<section><pre class="${styles.code}">${parsedBlock.join('\n')}</pre></section>`)
        })
    return parsed
}