import styles from "../styles/Markdown.module.css";

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
        baseRegex: /((\s+)|^)_[^_]*_/gi,
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
    divider: /\|(\s*)-+(\s*)\|(\s*)-+(\s*)\|/gi
}
export const EXTERNAL_SOURCE_REGEX = {
    image: /!\[(.*)]\((.*)\)/i,
    link: /((?!!).*)\[(.*)]\((.*)\)/i
}
export const CODE_BLOCK = {
    BASIC: /^```(?:jsx|javascript|console|html|json|$)\n([\s\S]*?)```$/mg,
    NOT_GLOBAL: /^```(?:jsx|javascript|console|html|json|$)\n([\s\S]*?)```$/m,
    TYPES: {
        jsx: /^```jsx$\n([\s\S]*?)```$/m,
        javascript: /^```javascript\n([\s\S]*?)```$/m,
        json: /^```json\n([\s\S]*?)```$/m,
        html: /^```html\n([\s\S]*?)```$/m,
        console: /^```console\n([\s\S]*?)```$/m
    },
    REPLACED:/^<section class="(.+)">\n<pre>([\s\S]*?)<\/pre>\n<\/section>/gmi,
    WHITE_SPACE: /^(\s+)/gmi,
    KEYWORDS: [
        /^&nbsp;(\s*)import(\s*)/g,
        /(\s*)from(\s+)/g,
        /^&nbsp;(\s*)function(\s+)/g,
        /^&nbsp;(\s*)const(\s+)/g,
        /^&nbsp;(\s*)let(\s+)/g,
        /^&nbsp;(\s*)return(\s+)/g,
        /^&nbsp;(\s*)class(\s+)/g,

    ],
    DOM_KEYWORDS: [
        /(\s*)([a-zA-Z]+)\./g,
        /(\s+)React(\s+)/g,
        /(\s+)ReactDOM(\s+)/g
    ],
    STRING: /&quot;([\s\S]*?)&quot;/g,
    OBJECT: /{([\s\S]*?)}/
}
export const JSX_REGEX = {
    TAG:/&lt;(.+)&gt;/gim ,
    SELF_CLOSING_TAG: /&lt;\/(.+)&gt;/gim,
    CLOSING_TAG: /&lt;(.+)\/&gt;/gim,
    STRING_ATTRIBUTE: /(\s*)([a-zA-Z]+)=&quot;([\s\S]*?)&quot;((\s)|&gt;)/igm,

    ATTRIBUTE: /(\s*)([a-zA-Z]+)={([\s\S]*?)}((\s+)|&gt;)/igm

}