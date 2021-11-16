import styles from "../styles/Block.module.css";
import enumerateLines from "../utils/enumerateLine";
import React, {useEffect} from "react";
import PropTypes from "prop-types";

export default function JsonCode(props){
    useEffect(() => {
        props.setCopy(props.data)
    })
    return (
        <code
            className={styles.code}
            dangerouslySetInnerHTML={{__html: enumerateLines(props.parsedData, '\n')}}
        />
    )
}
JsonCode.propTypes={
    setCopy: PropTypes.func,
    data: PropTypes.object,
    parsedData: PropTypes.string
}