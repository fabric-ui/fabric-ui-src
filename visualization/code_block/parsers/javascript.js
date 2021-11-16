import React from 'react'
import htmlParser from "./html";

const reactDomHighlight = (str) => {
return str
    .replace(/(.*?)ReactDOM.render/igm, '<b style="color: #EA00FF">$&</b>')
    .replace(/(.*?)ReactDOM.unmountComponentAtNode/igm, '<b style="color: #EA00FF">$&</b>')
}

export default function javascriptParser(data) {
    let res = []
    let fullCode = []
    try {
        let js = data.replace('\r', '\n').split('\n')
        let ended = false
        let startsOn = undefined
        let indexes = []
        const regexStartJSX = /^\s*\/\/\/JSX$/gm
        const regexEndJSX = /^\s*\/\/\/JSX-END$/gm
        js.forEach((e, i) => {
            if (regexEndJSX.test(e)) {
                indexes.push({
                    startsOn: startsOn,
                    endsOn: i
                })
                ended = true
            }

            if (regexStartJSX.test(e) && (ended || startsOn === undefined)) {
                startsOn = i
                ended = false
            }
        })

        indexes.forEach((e, index) => {

            let str = [...js].splice(e.startsOn, e.endsOn - e.startsOn)
            const jsx = htmlParser(str.join('\n').replace(regexStartJSX, '').replace(regexEndJSX, ''))
            let before = [], after = ''
            if (index > 0 ) {
                [...js].forEach((h, i)=>{
                    if(i >= indexes[index -1].endsOn && i <= e.startsOn)
                        before.push(h)
                })

                before = before.join('\n')
            }
            else if(index === 0)
                before = [...js].splice(0, e.startsOn + 2).join('\n')

            if (index === indexes.length -1)
                after = [...js].splice( e.endsOn, js.length).join('\n')

            if(typeof before === 'string')
                before = before
                    .replace(/ const /igm, '<b style="color: #003DFF">$&</b>')
                    .replace(/const /igm, '<b style="color: #003DFF">$&</b>')
                    .replace(/ let /igm, '<b style="color: #003DFF">$&</b>')
                    .replace(/ var /igm, '<b style="color: #003DFF">$&</b>')
                    .replace(/ import /igm, '<b style="color: #63474D">$&</b>')
                    .replace(/import /igm, '<b style="color: orange">$&</b>')
                    .replace(/ from /igm, '<b style="color: orange">$&</b>')
                    .replace(/function /igm, '<b style="color: #FF6A00">$&</b>')
                    .replace(/return /igm, '<b style="color: #FF6A00">$&</b>')

            fullCode.push(reactDomHighlight(before) + jsx + '\n' + reactDomHighlight(after))
            res.push(
                jsx
            )
        })

    } catch (e) {
        console.log(e)
    }
    return {jsxContent: res, fullCode: fullCode.join('\n'), originalCode: data}
}
