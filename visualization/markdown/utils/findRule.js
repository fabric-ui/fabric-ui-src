import {RULE_REGEX} from "./regex";
import styles from "../styles/Markdown.module.css";


export function findRule (lineBefore, line, lineAfter) {
    let parsed = line

    if ((lineBefore === null || lineBefore.match(RULE_REGEX.emptyLine) === null || RULE_REGEX.underline.test(line.trim())) && (lineAfter === null || lineAfter.match(RULE_REGEX.emptyLine) === null || RULE_REGEX.underline.test(line.trim())) && RULE_REGEX.base.test(line.trim())) {

        parsed = `<div class=${styles.divider}></div>`
    }

    return parsed
}
