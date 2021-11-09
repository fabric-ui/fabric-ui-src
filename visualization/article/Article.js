import PropTypes from 'prop-types'
import styles from './styles/Article.module.css'
import React from 'react'
import TypeTag from "./TypeTag";


export default function Article(props) {
    return (
        <article className={[props.className, styles.wrapper].join(' ')} style={props.styles}>
            {props.data.map((data, index) => (
                <section className={styles.block} key={`${index}-data_object`}>
                    <header className={styles.headers}>
                        {data.headers?.map((header, hIndex) => (
                            <h1
                                key={`${index}-data_object-${hIndex}-header`}
                                className={styles.header}
                                data-type={header.type}>
                                {header.linkTo ?
                                    <a className={styles.link} href={header.linkTo}>
                                        {header.content}
                                    </a>
                                    :
                                    header.content}
                            </h1>
                        ))}
                    </header>
                    <section className={styles.body}>
                        {data.body?.map((body, bIndex) => (
                            <React.Fragment key={`${index}-data_object-${bIndex}-body`}>
                                <TypeTag linkTo={body.linkTo} type={body.type} float={body.float} content={body.content}
                                         index={bIndex}/>
                            </React.Fragment>
                        ))}
                    </section>
                    <footer
                        className={styles.footer}
                        dangerouslySetInnerHTML={{__html: data.alert}}
                        style={{display: data.alert ? undefined : 'none'}}/>
                </section>
            ))}
        </article>
    )
}

Article.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
        headers: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
            linkTo: PropTypes.string
        })),
        body: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.any,
            type: PropTypes.oneOf(['text', 'code', 'pre-formatted', 'image']),
            float: PropTypes.oneOf(['right', 'left', 'stretch']),
            linkTo: PropTypes.string
        })),
        alert: PropTypes.any
    }))
}