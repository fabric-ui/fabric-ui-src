import PropTypes from 'prop-types'
import React, {useMemo} from "react";

export default function DynamicRoutes(props) {
    const contentIndex = useMemo(() => {
        if (props.ready && props.path !== undefined)
            return props.routes.findIndex(route => props.path === route.basePath)
        else
            return props.routes.findIndex(route => route.asIndex)
    }, [props.ready, props.path, props.routes])

    const Content = useMemo(() => {
        if (contentIndex >= 0)
            return props.routes[contentIndex].content
        else
            return null
    }, [contentIndex])

    return (
        <React.Fragment>
            {Content !== null ? <Content {...props.componentProps}/> : null}
        </React.Fragment>
    )

}

DynamicRoutes.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        basePath: PropTypes.string,
        content: PropTypes.object,
        asIndex: PropTypes.bool,
    })),
    ready: PropTypes.bool,
    path: PropTypes.string,
    componentProps: PropTypes.object

}