import styles from './styles.module.css'
import React from "react";
import ThemeContext from "../context/ThemeContext";
import PropTypes from "prop-types";
import LanguageContext from "../context/LanguageContext";

export default function MfcWrapper(props) {
  return (
    <LanguageContext.Provider value={props.language ? props.language : 'pt'}>
      <ThemeContext.Provider value={{
        dark: props.onDark,
        styles: styles,
        themes: {
          mfc_background_primary: !props.onDark ? 'white' : '#292c2b',
          mfc_background_secondary: !props.onDark ? '#f3f6f9' : '#1e2121',
          mfc_background_tertiary: !props.onDark ? '#f4f5fa' : '#191C1C',
          mfc_background_quaternary: !props.onDark ? '#E8F0FE' : '#1f2123',

          mfc_border_primary: !props.onDark ? '#F1F1F5' : '#1e2121',
          mfc_border_secondary: !props.onDark ? '#e0e0e0' : '#707070',

          mfc_color_primary: !props.onDark ? '#333333' : 'white',
          mfc_color_secondary: !props.onDark ? '#555555' : '#f4f5fa',
          mfc_color_tertiary: !props.onDark ? '#666666' : '#f0f0f0',
          mfc_color_quaternary: !props.onDark ? '#777777' : '#e0e0e0',
          mfc_color_quinary: !props.onDark ? '#999999' : '#dedede',
          mfc_color_senary: !props.onDark ? 'white' : '#292c2b',

          mfc_box_shadow_primary: !props.onDark ? '#e0e0e0' : '#1e2121'
        }
      }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
        />
        <div
          className={[props.onDark ? styles.dark : styles.light, props.className].join(' ')}
          style={props.styles}>
          {props.children}
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  )
}
MfcWrapper.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  onDark: PropTypes.bool,
  language: PropTypes.oneOf(['pt', 'en']),
  children: PropTypes.node
}
