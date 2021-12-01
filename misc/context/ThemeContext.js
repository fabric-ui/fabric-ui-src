import styles from '../theme/styles.module.css'
import React from "react"

export default React.createContext({
        dark: false,
        styles: styles,
        themes: {
            fabric_background_primary: 'white',
            fabric_background_secondary: '#f3f6f9',
            fabric_background_tertiary: '#f4f5fa',
            fabric_background_quaternary: '#E8F0FE',

            fabric_border_primary: '#F1F1F5',
            fabric_border_secondary: '#e0e0e0',

            fabric_color_primary: '#333333',
            fabric_color_secondary: '#555555',
            fabric_color_tertiary: '#666666',
            fabric_color_quaternary: '#777777',
            fabric_color_quinary: '#999999',
            fabric_color_senary: 'white',

            fabric_box_shadow_primary: '#e0e0e0',
        }
    }
)
