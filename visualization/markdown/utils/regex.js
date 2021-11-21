export const LIST_REGEX = {
    number: /^[0-9]+\. | {3}[0-9]+\. /gi,
    asterisk: /^\* | {3}\* /gi,
    minus: /^- | {3}- /gi,
    plus: /^\+ | {3}\+ /gi,
    nested: /^\s{3}(.+)/gi
}

export const INLINE_HEADER = {
    1: /^#\s/gi,
    2: /^##\s/gi,
    3: /^###\s/gi,
    4: /^####\s/gi,
    5: /^#####\s/gi,
    6: /^######\s/gi
}
export const ITALIC_REGEX = [
    {
        baseRegex: /_[^_]*_/gi,
        divider: /_/gi
    },
    {
        baseRegex: /\*[^*]*\*/gi,
        divider: /\*/gi
    }
]
export const BOLD_REGEX = [
    {
        baseRegex: /__[^_]*__/gi,
        divider: /__/gi
    },
    {
        baseRegex: /\*\*[^*]*\*\*/gi,
        divider: /\*\*/gi
    }
]
export const RULE_REGEX = {
    underline: /^_+$|^_$/gi,
    base: /^-+$|^-$|^\*+$|^\*$|^_+$|^_$/gi,
    emptyLine: /\S/g
}

export const TABLE_REGEX = {
    allRows: /^\| (.*) \|| \| (.*) \|/gi,
    contentRow: /\| ((?!-).*) \|| \| ((?!-).*) \|/gi,
    divider: /\| -+ \| -+ \|/gi
}
export const EXTERNAL_SOURCE_REGEX = {
    image: /!\[(.*)]\((.*)\)/i,
    link: /((?!!).*)\[(.*)]\((.*)\)/i
}