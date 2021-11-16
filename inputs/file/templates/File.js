import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import styles from "../styles/File.module.css";
import Button from "../../button/Button";

export default function File(props) {
    // const [hover, setHover] = useState(false)
    const icon = useMemo(() => {
        let icon
        switch (props.type) {
            case 'pdf': {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">picture_as_pdf</span>
                break
            }
            case 'png': {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">image</span>
                break
            }
            case 'jpeg': {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">image</span>
                break
            }
            case 'jpg': {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">image</span>
                break
            }
            case 'html': {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">web</span>
                break
            }

            default : {

                icon = <span
                    style={{fontSize: '65px'}}
                    className="material-icons-round">description</span>
                break
            }

        }
        return icon
    }, [props.type])
    return (
        <div className={styles.fileContainer}>

            <Button onClick={() => props.handleDelete(props.index)} styles={{padding: '4px'}}>
                <span
                    style={{fontSize: '1rem'}}
                    className="material-icons-round">close</span>

            </Button>
            {icon}
            <div className={styles.fileLabel}>
                {props.name.split('.')[0]}
            </div>
        </div>
    )
}

File.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    index: PropTypes.number,
    handleDelete: PropTypes.func
}
