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



    return (
        <button
            className={[styles.button, variant.normal, props.highlight ? variant.highlight : undefined, props.className].join(' ')}
            onClick={props.onClick} ref={props.reference}
            style={props.styles}
            data-highlight={JSON.stringify(props.highlight)}
            disabled={props.disabled}
        >
            <Ripple
                disabled={props.disabled}
                opacity={props.variant === 'filled' ? .8 : undefined}
                accentColor={props.accentColor}
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
    accentColor: PropTypes.string,
    className: PropTypes.string
}
