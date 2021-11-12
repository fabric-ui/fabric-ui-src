import PropTypes from "prop-types";
import Modal from "../modal/Modal";
import styles from './styles/Loading.module.css'

export default function Loader(props) {
    return (
        <Modal open={props.loading} handleClose={() => null} blurIntensity={0}>
            <div className={styles.loading}/>
        </Modal>
    )
}
Loader.propTypes = {
    loading: PropTypes.bool
}