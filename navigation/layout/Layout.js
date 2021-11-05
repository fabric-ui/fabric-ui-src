import React, {useMemo} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'
import Profile from './components/profile/Profile'
import Apps from './components/apps/Apps'
import SideBar from "./components/sidebar/SideBar";
import Loading from "./templates/Loading";
import useMaxHeight from "../../misc/useMaxHeight";


export default function Layout(props) {

    const components = useMemo(() => {
        const nodes = React.Children.toArray(props.children)

        return {
            profile: nodes.find(e => e.type === Profile),
            apps: nodes.find(e => e.type === Apps),
            sideBar: nodes.find(e => e.type === SideBar),
            child: nodes.find(e => e.type !== SideBar && e.type !== Apps && e.type !== Profile)
        }
    }, [props])
    const {ref, maxHeight} = useMaxHeight()
    return (
        <div className={styles.wrapper}>
            {/*<div className={styles.contentWrapper}>*/}
            {components.sideBar}
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <Loading loading={props.loading}/>
                    <div className={styles.content}>
                        <img
                            style={{height: '35px'}}
                            src={props.logo}
                            alt={'logo'}
                        />
                        {props.appName}
                    </div>
                    <div className={styles.content} style={{justifyContent: 'flex-end', gap: '8px'}}>
                        {components.apps}
                        {components.profile}
                    </div>

                </div>
                <div className={styles.children} ref={ref} style={{maxHeight: maxHeight}}>
                    {components.child}
                </div>

            </div>
            {/*</div>*/}
        </div>
    )

}

Layout.propTypes = {
    children: PropTypes.node,
    appName: PropTypes.string,
    logo: PropTypes.any,
    loading: PropTypes.bool
}
