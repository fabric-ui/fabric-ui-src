import PropTypes from "prop-types";

export default function RailActionWrapper(props){
    return props.children ? props.children : <></>
}

RailActionWrapper.propTypes={
    children: PropTypes.node,
    className: PropTypes.string,
    styles: PropTypes.string,
    place: PropTypes.oneOf(['start', 'end'])
}