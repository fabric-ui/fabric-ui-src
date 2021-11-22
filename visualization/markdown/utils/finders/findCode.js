import {CODE_BLOCK} from "../regex";
import styles from '../../styles/Markdown.module.css'

export default function findCode(str) {
    const match = str.match(CODE_BLOCK.BASIC)
    let parsed = str

    if (match !== null)
        match.forEach(e => {
            console.log(e.match(CODE_BLOCK.NOT_GLOBAL))
            parsed = parsed.replace(CODE_BLOCK.NOT_GLOBAL, `<section data-layer="true" class="${styles.quote}">\n${e.match(CODE_BLOCK.NOT_GLOBAL)[1]}\n</section>`)
        })

    return parsed
}