import PropTypes from "prop-types";
import {useEffect} from "react";

export default function JsonObjectWrapper(props){
    useEffect(() => {

    })
    return(
        props.content
    )
}

JsonObjectWrapper.propTypes= {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}