import React, {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import Tabs from "../../../navigation/tabs/Tabs";
import Tab from "../../../navigation/tabs/Tab";
import shared from '../styles/Block.module.css'
import enumerateLines from "../utils/enumerateLine";

export default function JavascriptCode(props) {

    const ref = useRef()
    const tabs = useMemo(() => {
        return props.jsxContent.map((c, i) => enumerateLines(c, '\n'))
    }, [props])
    const full = useMemo(() => {
        return enumerateLines(props.fullCode, '\n', true)
    }, [props])
    useEffect(() => {
        props.setCopy(props.originalCode)
    }, [props])
    const [open, setOpen] = useState(0)
    console.log(props)
    return useMemo(() => {
        if (props.extended) {
            return (
                <code
                    style={{display: 'grid', alignItems: 'flex-start', alignContent: 'flex-start'}}
                    className={shared.code}
                    ref={ref}
                    dangerouslySetInnerHTML={{__html: full}}/>
            )
        } else if(tabs.length > 1){
            return (
                <Tabs styles={{position: 'relative'}} setOpen={setOpen} open={open}>
                    {tabs.map((c, i) => (
                        <Tab label={'Jsx code ' + i}>
                            <code
                                ref={ref}
                                className={shared.code}
                                dangerouslySetInnerHTML={{__html: c}}
                                style={{display: 'grid', alignItems: 'flex-start', alignContent: 'flex-start'}}
                            />
                        </Tab>
                    ))}
                </Tabs>
            )
        }
        else if(tabs.length === 1)
            return (
                <code
                    ref={ref}
                    className={shared.code}
                    dangerouslySetInnerHTML={{__html: tabs[0]}}
                    style={{display: 'grid', alignItems: 'flex-start', alignContent: 'flex-start'}}
                />
            )
        else
            return null
    }, [props.extended, props.jsxContent])


}

JavascriptCode.propTypes = {
    originalCode: PropTypes.string,
    jsxContent: PropTypes.arrayOf(PropTypes.shape({
        jsx: PropTypes.string,
        before: PropTypes.string,
        after: PropTypes.string
    })),
    fullCode: PropTypes.string,
    setCopy: PropTypes.func,
    extended: PropTypes.bool
}
