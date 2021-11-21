import styles from "../styles/Block.module.css";
import enumerateLines from "../utils/enumerateLine";
import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";

export default function JsonCode(props){
    useEffect(() => {
        props.setCopy(props.data)
    }, [props])
    const data = useMemo(() => {
        return enumerateLines(props.parsedData, '\n')
    }, [props])
    console.log(data)
    return (
        <code
            className={styles.code}
            dangerouslySetInnerHTML={{__html: data}}
        />
    )
}
JsonCode.propTypes={
    setCopy: PropTypes.func,
    data: PropTypes.object,
    parsedData: PropTypes.string
}