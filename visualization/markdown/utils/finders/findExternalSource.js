import {EXTERNAL_SOURCE_REGEX} from "../regex";

export function findImage(line){
    let parsed = line
    const match = line.match(EXTERNAL_SOURCE_REGEX.image)
    if(match !== null) {
        const alt = match[1]
        const src = match[2]
        parsed = parsed.replace(EXTERNAL_SOURCE_REGEX.link, `<img src="${src}" alt="${alt}"/>`)

    }

    return parsed
}

export function findLink(line){
    let parsed = line
    const match = line.match(EXTERNAL_SOURCE_REGEX.link)
    if(match !== null) {
        const alt = match[2]
        const href = match[3]
        parsed = parsed.replace(EXTERNAL_SOURCE_REGEX.link, `<a href="${href}">${alt}</a>`)
    }
    return parsed
}
