import PropTypes from 'prop-types'
import styles from './styles/List.module.css'
import ListHeader from "./components/ListHeader";
import React, {useState} from "react";
import Empty from "../../feedback/empty/Empty";
import keyTemplate from "./templates/keyTemplate";
import useList from "./hook/useList";
import Settings from "./components/Settings";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Row from "./components/Row";

export default function List(props) {
    const {keys, keysDispatcher, actions, setOpenSettings, openSettings} = useList(props.keys)
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
    const [scrolled, setScrolled] = useState(false)

    return (
        <div
            onScroll={event => {
                if (event.target.scrollTop > 0)
                    setScrolled(true)
                else
                    setScrolled(false)
            }}
            className={styles.container}
        >
            <Settings
                open={openSettings}
                keys={keys} actions={actions} setOpen={setOpenSettings}
                dispatchKeys={keysDispatcher}/>
            <ListHeader
                options={props.options}
                scrolled={scrolled}

                title={props.title}
                noFilters={props.noFilters}

                createOption={props.createOption}
                onCreate={props.onCreate}

                hook={props.hook}

                hasOptions={props.controlButtons && props.controlButtons.length > 0}

                keys={keys} actions={actions} dispatch={keysDispatcher}
                setOpenSettings={setOpenSettings}
            />
            <div
                className={styles.tableWrapper}
            >
                {props.hook.data.length === 0 ?
                    <Empty/>
                    :
                    null
                }

                {props.hook.data.map((e, index) => (
                    <React.Fragment key={e.id + '-list-row'}>

                        <Row
                            onClick={() => props.onRowClick(e.data)}
                            entry={e.data}
                            index={index}
                            controlButtons={props.controlButtons}
                            keys={props.keys.filter(e => e.visible === true)}
                            reference={lastElementRef}
                            hasOptions={props.controlButtons && props.controlButtons.length > 0}
                        />

                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

List.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.any
    })),

    noFilters: PropTypes.bool,
    hook: PropTypes.object.isRequired,
    onRowClick: PropTypes.func.isRequired,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    title: PropTypes.any,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func,
    onlyVisualization: PropTypes.bool
}
