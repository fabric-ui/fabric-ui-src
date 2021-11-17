import styles from '../theme/styles.module.css'
import React from "react"

export default React.createContext({
        dark: false,
        styles: styles,
        themes: {
            mfc_background_primary: 'white',
            mfc_background_secondary: '#f3f6f9',
            mfc_background_tertiary: '#f4f5fa',
            mfc_background_quaternary: '#E8F0FE',

            mfc_border_primary: '#F1F1F5',
            mfc_border_secondary: '#e0e0e0',

            mfc_color_primary: '#333333',
            mfc_color_secondary: '#555555',
            mfc_color_tertiary: '#666666',
            mfc_color_quaternary: '#777777',
            mfc_color_quinary: '#999999',
            mfc_color_senary: 'white',

            mfc_box_shadow_primary: '#e0e0e0',
        }
    }
)
