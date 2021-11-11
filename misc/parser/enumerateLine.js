export default function enumerateLines(data) {
    let d = data
    try{

        d = d.split('\n')
        d = d.map((line, i) => line.length > 0 ? `<span style="user-select: none; color: var(--mfc-color-quinary); position: absolute">${i}</span>      ${line}` : '')
        d = d.join('\n')
    }catch (e){}

    return d
}

