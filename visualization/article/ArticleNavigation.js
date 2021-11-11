import PropTypes from "prop-types";
import styles from './styles/Navigation.module.css'
import React from 'react'
import Button from "../../inputs/button/Button";

export default function ArticleNavigation(props) {

    return (
        <div className={styles.wrapper}>
            {props.headers.map((e, i) => (
                <React.Fragment key={i + '-headers'}>
                    <Button
                        variant={'minimal-horizontal'}
                        className={styles.button}
                        onClick={() => {
                            const element = document.getElementById(e.id)
                            if (element)
                                props.scrollTo(element.offsetTop)
                        }}>
                        {e.content}
                    </Button>
                </React.Fragment>
            ))}
        </div>
    )
}
ArticleNavigation.propTypes = {
    scrollTo: PropTypes.func,
    headers: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
        linkTo: PropTypes.string,
        id: PropTypes.string
    }))
}