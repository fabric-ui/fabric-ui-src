import PropTypes from 'prop-types'
import styles from "../../styles/Details.module.css";
import React, {useMemo} from "react";
import Modal from "../../../../navigation/modal/Modal";
import useLocale from "../../../../misc/hooks/useLocale";

export default function Details(props) {
    const translate = useLocale()
    const data = useMemo(() => {
        let res = props.data.details
        try {
            const jsonData = props.data.details && typeof  props.data.details === 'string' ? JSON.parse(props.data.details) : null
            res = JSON.stringify((jsonData), null, 4)
        } catch (e) {
        }

        return res
    }, [props])
    return (
        <Modal open={props.open} handleClose={() => props.handleClose()}
               className={styles.wrapper} blurIntensity={.1} animationStyle={"slide-right"}>
            <div className={styles.header}>
                {props.data.httpStatusCode >= 300 ? translate('error') : translate('success')} - {props.data.httpStatusCode}
                <div className={styles.subHeader}>
                    {props.data.url}
                </div>
            </div>
            <div style={{width: '100%', display: 'grid',}}>
                <div style={{display: 'flex', gap: '16px', alignItems: 'center', position: 'relative'}}>
                    {translate('details')}

                </div>
                <pre className={styles.body} style={{overflow: 'auto'}}>
                    {data}
                </pre>
            </div>
            <div style={{paddingBottom: '16px'}}>
                {translate('params')}

                <div className={styles.footer}>
                    <div>
                        {translate('method')} {props.data.method}
                    </div>
                    <div style={{width: '100%', overflow: 'hidden'}}>
                        {translate('setPackage')}
                        <pre className={styles.body} style={{overflow: 'auto'}}>
                                        {JSON.stringify(props.data.package, null, 4)}
                                    </pre>
                    </div>
                    <div>
                        {translate('url')} {props.data.url}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
Details.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,

    data: PropTypes.shape({
        message: PropTypes.string,
        details: PropTypes.string,
        httpStatusCode: PropTypes.number,
        package: PropTypes.any,
        method: PropTypes.string,
        url: PropTypes.string
    })
}
