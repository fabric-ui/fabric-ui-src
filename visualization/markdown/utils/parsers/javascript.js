import React from 'react'
import styles from '../../styles/Markdown.module.css'
import {JSX_REGEX} from "../regex";

const reactDomHighlight = (str) => {
    return str
        .replace(/(.*?)ReactDOM.render/igm, '<b style="color: #EA00FF">$&</b>')
        .replace(/(.*?)ReactDOM.unmountComponentAtNode/igm, '<b style="color: #EA00FF">$&</b>')
}

function parseTag(tag) {
    let newTag = tag
    const objectAttributes = tag.match(JSX_REGEX.ATTRIBUTE)
    const stringAttributes = tag.match(JSX_REGEX.STRING_ATTRIBUTE)
    let parsedAttr = []

    objectAttributes?.forEach(a => {
        const attr= a.split('=')

        parsedAttr.push({
            original: a,
            new: `<span class="${styles.attr}">${attr[0]}</span><span class="${styles.attrValue}">=${attr[1]}</span>`
        })
    })
    stringAttributes?.forEach(a => {
        const attr= a.split('=')
        parsedAttr.push({
            original: a,
            new: `<span class="${styles.attr}">${attr[0]}</span><span class="${styles.attrValue}">=${attr[1]}</span>`
        })
    })

    parsedAttr.forEach(p => {
        newTag = newTag.replace(p.original, p.new)
    })

    return newTag
}

export default function javascriptParser(data) {
    let parsedString = data
    let newJsx = data
    const tags = {
        tag: parsedString.match(JSX_REGEX.TAG),
        closing: parsedString.match(JSX_REGEX.CLOSING_TAG),
        selfClosing: parsedString.match(JSX_REGEX.SELF_CLOSING_TAG)
    }

    let tagsToReplace = []
    tags.tag?.forEach(t => {
        tagsToReplace.push({
            original: t,
            new: `<span class="${styles.tag}">${parseTag(t)}</span>`
        })
    })
    tags.closing?.forEach(t => {
        tagsToReplace.push({
            original: t,
            new: `<span class="${styles.tag}">${parseTag(t)}</span>`
        })
    })
    tags.selfClosing?.forEach(t => {
        tagsToReplace.push({
            original: t,
            new: `<span class="${styles.tag}">${parseTag(t)}</span>`
        })
    })

    tagsToReplace.forEach(t => {
        parsedString = parsedString.replace(t.original, t.new)
    })


    // parsedString = parsedString.replaceAll(/&lt;(.+)&gt;/gim, `<span class="${styles.tag}">$&</span>`)
    // parsedString = parsedString.replaceAll(/&lt;\/(.+)&gt;/gim, `<span class="${styles.tag}">$&</span>`)
    // parsedString = parsedString.replaceAll(/&lt;(.+)\/&gt;/gim, `<span class="${styles.tag}">$&</span>`)

    // tags.map()
    // split.forEach()
    return parsedString
}
