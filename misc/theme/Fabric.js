import styles from './styles.module.css'
import React, {useMemo} from "react";
import ThemeContext from "../context/ThemeContext";
import PropTypes from "prop-types";
import LanguageContext from "../context/LanguageContext";

export default function Fabric(props) {
  const dark = useMemo(() => {
    return props.theme === 'dark'
  }, [props.theme])
  const themes = useMemo(() => {
    return {
      ...props.styles,
      ...props.backgrounds ?
        {
          '--fabric-background-primary': dark ? props.backgrounds?.darkPrimary : props.backgrounds?.primary,
          '--fabric-background-secondary': dark ? props.backgrounds?.darkSecondary : props.backgrounds?.secondary,
          '--fabric-background-tertiary': dark ? props.backgrounds?.darkTertiary : props.backgrounds?.tertiary,
          '--fabric-background-quaternary': dark ? props.backgrounds?.darkQuaternary : props.backgrounds?.quaternary,
        }
        :
        {},
      ...props.borders ? {
        '--fabric-border-primary': dark ? props.backgrounds?.darkPrimary : props.backgrounds?.primary,
        '--fabric-border-secondary': dark ? props.backgrounds?.darkSecondary : props.backgrounds?.secondary,
      } : {},
      '--fabric-accent-color': props.accentColor ? props.accentColor : '#0095ff'
    }
  }, [props.backgrounds, props.borders, props.accentColor])
  return (
    <LanguageContext.Provider value={props.language !== undefined ? props.language : 'pt'}>
      <ThemeContext.Provider value={{
        dark: dark,
        styles: styles,
        themes: themes
      }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
        />
        <div
          className={[dark ? styles.dark : styles.light, props.className].join(' ')}

          style={themes}>
          {props.children}
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  )
}
Fabric.propTypes = {
  backgrounds: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    quaternary: PropTypes.string,

    darkPrimary: PropTypes.string,
    darkSecondary: PropTypes.string,
    darkTertiary: PropTypes.string,
    darkQuaternary: PropTypes.string
  }),

  borders: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,

    darkPrimary: PropTypes.string,
    darkSecondary: PropTypes.string,
  }),

  accentColor: PropTypes.string,

  className: PropTypes.string,
  styles: PropTypes.object,

  theme: PropTypes.oneOf(['dark', 'light']),
  language: PropTypes.oneOf(['pt', 'en']),
  children: PropTypes.node
}
