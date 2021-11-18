import React from 'react'
import styles from '../styles/Block.module.css'

const SPACE = '  '
const getPadding = (length) => {
    switch (true) {
        case length > 10 && length < 100:
            return '24px'
        case length >= 100 && length < 1000:
            return '32px'
        default:
            return '16px'
    }
}
export default function enumerateLines(data, divider) {
    let smallestWhiteSpace, removedLines = 0, padding, d = data

    try {
        d = d.split(divider)
        padding = getPadding(d.length)

        d.forEach((e, index) => {
            if (e !== '\r') {
                const c = e.split('')
                let whitespaces = 0
                c.every((s) => {

                    if (/\s/.test(s)) {
                        whitespaces = whitespaces + 1
                        return true
                    } else
                        return false
                })
                if (whitespaces < smallestWhiteSpace || smallestWhiteSpace === undefined)
                    smallestWhiteSpace = whitespaces
            }
        })

        d = d.map((line, i) => {
            if (!/^\s+$/gm.test(line)) {
                const c = line.split('')
                let newLine = []
                let reachedLetter = false
                c.forEach((s) => {
                    if (/\s/.test(s) && !reachedLetter)
                        newLine.push('&nbsp')
                    else {
                        reachedLetter = true
                        newLine.push(s)
                    }
                })
                newLine = newLine.join('')
                const content = newLine.replace(' '.repeat(smallestWhiteSpace), '')
                return `<span><button class=${styles.enumeration}>${i - removedLines}</button><span class=${styles.enumContent} style="padding-left: ${padding}">${content}</span></span>`
            } else {
                removedLines += 1
                return null
            }
        })
        d.filter(e => e !== null)
        d = d.join(divider)

    } catch (e) {
    }


    return d
}

