import styles from "../../styles/Markdown.module.css";

export default function findQuote  (line, callbackIndex) {
    const innerRegex = callbackIndex !== undefined && callbackIndex > 0 ? /\s&gt;\s(.+)/gi : /^&gt;\s/gi
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