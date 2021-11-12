import PropTypes from 'prop-types'
import styles from './styles/Article.module.css'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import TypeTag from "./TypeTag";
import ArticleNavigation from "./ArticleNavigation";


export default function Article(props) {
    const ref = useRef()
    const headers = useMemo(() => {
        let h = []
        props.data.forEach((e, eI) => e.headers?.forEach((l, i) => {
            if (l.type === 'primary')
                h.push({...l, id: 'header-' + eI})
        }))
        return h
    }, [props.data])

    const intersectionObs = useRef()
    const [onHeader, setOnHeader] = useState(0)

    const handleIntersection = (event) => {
        const inter = event.filter(e => e.isIntersecting)
        if (inter && inter.length > 0) {
            const i = parseInt(inter[0].target.id.split('-')[1])
            setOnHeader(i)
        }
    }

    useEffect(() => {
        intersectionObs.current = new IntersectionObserver(handleIntersection, {
            root: ref.current,
            rootMargin: "0px 0px -50% 0px"
        })
        headers.forEach((e) => {
            const element = document.getElementById(e.id)
            intersectionObs.current?.observe(element)
        })
        return () => {
            headers.forEach((e) => {
                const element = document.getElementById(e.id)
                if (element !== null)
                    intersectionObs.current?.unobserve(element)
            })
        }
    }, [])

    return (
        <div className={styles.container} ref={ref}>
            <article className={[props.className, styles.wrapper].join(' ')} style={props.styles}>
                {props.data.map((data, index) => (
                    <section className={styles.block} key={`${index}-data_object`} style={{position: 'relative'}}>
                        <div
                            id={'header-' + index}
                            style={{
                                height: '10px',
                                position: 'absolute',
                                top: '0'
                            }}/>
                        <header className={styles.headers}>
                            {data.headers?.map((header, hIndex) => (
                                <h1

                                    key={`${index}-data_object-${hIndex}-header`}
                                    className={styles.header}
                                    data-variant={header.type}>
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
                                    <TypeTag
                                        linkTo={body.linkTo}
                                        type={body.type}
                                        float={body.float}
                                        content={body.content}
                                        index={bIndex}
                                    />
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
            <ArticleNavigation
                onHeader={onHeader}
                headers={headers}
                setOnHeader={setOnHeader}
                scrollTo={position => {
                    ref.current.scroll(0, position - ref.current.offsetTop)
                }}
            />
        </div>
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