import PropTypes from "prop-types";
import styles from './styles/Button.module.css'
import React, {useMemo} from "react";
import Ripple from "../../misc/ripple/Ripple";

export default function Button(props) {
    const variant = useMemo(() => {
        switch (props.variant) {
            case 'minimal':
                return {
                    normal: styles.minimal,
                    highlight: [styles.minimalHighlight, styles.baseHighlight].join(' ')
                }
            case 'filled':
                return {
                    normal: styles.filled,
                    highlight: styles.filledHighlight
                }

            case 'outlined':
                return {
                    normal: styles.outlined,
                    highlight: [styles.outlinedHighlight, styles.baseHighlight].join(' ')
                }
            case 'minimal-horizontal':
                return {
                    normal: [styles.minimal, styles.minimalHorizontal].join(' '),
                    highlight: [styles.minimalHighlight, styles.baseHighlight].join(' ')
                }
            default:
                return {
                    normal: [styles.default, styles.outlined].join(' '),
                    highlight: [styles.outlinedHighlight, styles.baseHighlight].join(' ')
                }
        }
    }, [props.variant, props.highlight]);

    const color = useMemo(() => {
        if (props.color === 'secondary')
            return styles.secondaryVariant
        else
            return undefined
    }, [props.color])


    const accentColor = useMemo(() => {
        if (props.variant === 'filled') {
            if (props.color === 'secondary')
                return '#FF2626'
            else
                return '#0080DB'
        } else if (props.color === 'secondary')
            return '#ff5555'
        else
            return '#0095ff'

    }, [props.color])

    return (
        <button
            className={[styles.button, variant.normal, props.highlight ? variant.highlight : undefined, color, props.className].join(' ')}
            onClick={props.onClick} ref={props.reference}
            style={props.styles}
            disabled={props.disabled}
        >
            <Ripple
                disabled={props.disabled}
                opacity={props.variant === 'filled' ? .8 : undefined}
                accentColor={accentColor}
            />
            {props.children}
        </button>

    )
}

Button.propTypes = {
    reference: PropTypes.any,
    variant: PropTypes.oneOf(['minimal', 'filled', 'outlined', 'minimal-horizontal']),
    children: PropTypes.node,
    styles: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    highlight: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'secondary']),
    className: PropTypes.string
}
