import styles from '../styles/SelectorModal.module.css'
import React, {useEffect} from "react";
import Modal from "../../../navigation/modal/Modal";
import PropTypes from "prop-types";
import Row from "./Row";
import useInfiniteScroll from "../../../visualization/hooks/useInfiniteScroll";
import Empty from "../../../feedback/empty/Empty";
import ToolTip from "../../../feedback/tooltip/ToolTip";
import useHeader from "../../../visualization/list/hook/useHeader";
import Filter from "../../../visualization/filter/Filter";
import Button from "../../button/Button";
import useLocale from "../../../misc/hooks/useLocale";

export default function SelectorModal(props) {
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
    const {
        getType,
        parseDate,
        open,
        setOpen
    } = useHeader(props.dispatch, props.actions)

    useEffect(() => {
        if (props.open)
            props.hook.clean()
    }, [props.open])

    const translate = useLocale()

    return (
        <Modal
            open={props.open}
            handleClose={() => {

                if (!open)
                    props.setOpen(false)
            }}
            animationStyle={'slide-right'}
            blurIntensity={0}
            className={styles.wrapper}
        >
            <div className={styles.header}>
                {props.label}
            </div>
            <div className={styles.headerButtons}>

                <div style={{display: 'flex', gap: '8px'}}>
                    <Button
                        variant={'outlined'}
                        onClick={() => props.onCreate()}
                        styles={{display: props.createOption === true ? undefined : 'none'}}
                        className={styles.headerButton}
                    >
                        <span className="material-icons-round">add</span>
                        <ToolTip content={translate('create_new')}/>
                    </Button>
                    <Button
                        variant={'outlined'}
                        onClick={() => props.hook.clean()}
                        className={styles.headerButton}
                    >
                        <span className="material-icons-round">refresh</span>

                        <ToolTip content={translate('reload_data')}/>
                    </Button>
                    <Button
                        variant={'outlined'}
                        onClick={() => setOpen(true)}
                        className={styles.headerButton}
                    >
                        <span className="material-icons-round">filter_list</span>
                        <ToolTip content={translate('filters')}/>
                    </Button>

                </div>
                <Button
                    variant={'outlined'}
                    onClick={() => {
                        props.handleChange(null)
                        props.setOpen(false)
                    }} color={"secondary"}
                    className={styles.headerButton}
                    disabled={!props.value}>

                    <span className="material-icons-round">clear_all</span>
                    {translate('clear_selected')}
                    <ToolTip content={translate('clear_selected')}/>
                </Button>

            </div>

            <Filter
                keys={props.keys} filters={props.hook.filters}
                setFilters={props.hook.setFilters}
                cleanState={props.hook.clean} getType={getType}
                open={open} setOpen={setOpen}
                parseDate={parseDate}
            />

            <Row
                main={true}
                disabled={true}
                data={props.value}
                keys={props.keys}
                onDrop={index => {
                    if (!isNaN(index)) {
                        props.handleChange(props.hook.data[index].data)
                        props.setOpen(false)
                    }
                }}
            />

            <div className={styles.divider}/>


            <div className={styles.rows}>
                {props.hook.data.length === 0 ? <Empty/> : props.hook.data.map((e, i) => (
                    <React.Fragment key={e.id + '-selector-modal-row-' + i}>
                        <Row
                            disabled={false} emptyIndicator={false}
                            onClick={() => {
                                props.handleChange(e.data)
                                props.setOpen(false)
                            }}
                            keys={props.keys}
                            reference={i === (props.hook.data.length - 1) ? lastElementRef : undefined}
                            data={e.data} index={i}
                            identificationKey={props.identificationKey}
                        />
                    </React.Fragment>
                ))}
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.array,
    createOption: PropTypes.bool,

    open: PropTypes.bool,
    setOpen: PropTypes.func,

    cleanState: PropTypes.func,
    value: PropTypes.object,
    handleChange: PropTypes.func,

    label: PropTypes.string,
    hook: PropTypes.object,
    identificationKey: PropTypes.string,
    onCreate: PropTypes.func
}
