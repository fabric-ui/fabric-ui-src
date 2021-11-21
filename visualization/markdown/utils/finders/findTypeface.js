import {BOLD_REGEX, ITALIC_REGEX} from "../regex";

export function findBold (line) {
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
export function findItalic (line) {

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