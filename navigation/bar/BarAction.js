import PropTypes from "prop-types";

export default function BarAction(props){
    return props.children
}

BarAction.propTypes={
    children: PropTypes.node,
    className: PropTypes.string,
    styles: PropTypes.string,
    place: PropTypes.oneOf(['start', 'end'])
}