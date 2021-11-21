import PropTypes from "prop-types";
import styles from '../styles/Markdown.module.css'
export default function Markdown(props){
    return (
        <pre className={styles.wrapper} dangerouslySetInnerHTML={{__html: props.parsedData}}/>
    )
}

Markdown.propTypes={
    parsedData: PropTypes.string
}