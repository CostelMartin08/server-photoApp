import React from "react";
import { Link } from "react-router-dom";
import { routesBase } from "../scripts/routes";

const style = {

    textBox: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}

const FormMessage = () => {

    return (
        <div style={style.textBox}>
            <div>
                <h4>Formularul a fost trimis!  <i class="ms-2 text-success fa-solid fa-check fa-xl"></i></h4>
                <p>Iti multumesc pentru interesul acordat </p>
                <Link
                    to={routesBase.home}
                    type="button"
                    className="text-font btn btn-secondary"
                >Acasa
                </Link>
            </div>
        </div>
    )
}

export default FormMessage;