import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


    const toggleTheme = () => {
        const storedTheme = localStorage.getItem('theme');


        if (storedTheme === null || storedTheme === undefined) {
            setTheme('light');
            localStorage.setItem('theme', 'light');

        } else if (storedTheme === 'light') {
            setTheme('dark');
            localStorage.removeItem('theme');
            localStorage.setItem('theme', 'dark');
        } else if (storedTheme === 'dark') {
            setTheme('light');
            localStorage.removeItem('theme')
            localStorage.setItem('theme', 'light');
        }

    }



    const themeMod = {
        light: {
            contrastText: 'text-dark',
            border: 'borderHeader',
            bg: 'bg',
            bgB: 'bg-day',
            bgHeader: 'bgDay-header',
            creator: 'text-font-creator-light',
            sVg: '#3A6351',
            sVg2: '#282A29'

        },

        dark: {

            contrastText: 'text-light',
            border: 'borderHeaderNight',
            bg: 'bgDark',
            bgB: 'bg-night',
            bgHeader: 'bgDark-header',
            creator: 'text-font-creator-dark',
            sVg:'#562B08',
            sVg2: '#ffffff'

        },
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mod: themeMod[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
