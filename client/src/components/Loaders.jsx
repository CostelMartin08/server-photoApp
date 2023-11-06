import React from "react";
import "./loaders.css";
import { useTheme } from "../scripts/useTheme";

const style = {


    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}


const Loaders = () => {

    const theme = useTheme();


    return (
        <section
            className="vh-100"
            style={style.flex}>
            <div
                className={`loader `}>
                <div className={`circle ${theme.mod.bg}`}></div>
                <div className={`circle ${theme.mod.bg}`}></div>
                <div className={`circle ${theme.mod.bg}`}></div>
                <div className={`circle ${theme.mod.bg}`}></div>
            </div>
        </section>
    );
}


export default Loaders;