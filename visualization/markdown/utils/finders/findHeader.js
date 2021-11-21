import {INLINE_HEADER} from "../regex";

export function findInlineHeader (line) {
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