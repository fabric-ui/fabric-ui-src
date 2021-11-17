import styles from "./styles/Block.module.css";
import Button from "../../inputs/button/Button";
import PropTypes from "prop-types";
import React, {useState} from "react";
import ToolTip from "../../feedback/tooltip/ToolTip";
import useCopyToClipboard from "../../misc/hooks/useCopyToClipboard";
import Alert from "../../feedback/alert/Alert";


export default function Wrapper(props) {
    const copy = useCopyToClipboard()
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState(null)
    return (
        <div className={styles.wrapper} style={{width: props.width}} data-float={props.float ? props.float : 'none'}>
            {props.children(setContent)}
            <Alert
                handleClose={() => setSuccess(null)}
                open={success !== null}
                variant={success ? 'success' : 'alert'}
                   delay={3000}>
                {success ? 'Copied!' : 'Copy was unsuccessful.'}
            </Alert>
            <div className={styles.buttons}>

                {props.options?.map((e, i) => (
                    <Button variant={'minimal'} color={e.color} onClick={e.onClick} className={styles.button}>
                        {e.icon}
                        <ToolTip content={e.label}/>
                    </Button>
                ))}
                <Button
                    variant={"filled"}
                    onClick={() => {
                        setSuccess(copy(content))
                    }}
                    className={styles.button}
                >
                    <ToolTip content={'Copy content'}/>
                    <span className="material-icons-round" style={{fontSize: '1.2rem'}}>
                            content_copy
                        </span>
                </Button>
            </div>
        </div>
    )

}
Wrapper.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        onClick: PropTypes.func,
        label: PropTypes.string,
        icon: PropTypes.node
    })),
    width: PropTypes.string,
    float: PropTypes.oneOf(['right', 'left', 'stretch']),
    children: PropTypes.func.isRequired,
    noCopy: PropTypes.bool
}
