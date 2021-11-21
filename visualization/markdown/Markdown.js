import PropTypes from "prop-types";
import styles from './styles/Markdown.module.css'
import {useMemo} from "react";
import markdownParser from "./utils/markdown";

export default function Markdown(props){
    const data = useMemo(() => {
        return markdownParser(props.data)
    }, [props.data])

    return (
        <pre className={styles.wrapper} dangerouslySetInnerHTML={{__html: data}}/>
    )
}

Markdown.propTypes={
    data: PropTypes.string.isRequired
}