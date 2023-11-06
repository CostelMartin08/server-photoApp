import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { urlBase } from "../scripts/url";
import logoBG from '../components/photo/logo-bg.png';
import { routesBase } from "../scripts/routes";
import SwitchButton from "../components/SwitchButton";
import './header.css';

const style = {
    imgW: {
        width: '80px',
    }
}

const Header = (props) => {

    const location = useLocation();
    const param = location.pathname.split('/');
    const theme = props.theme.mod;
    const [visibility, setVisibility] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const disconnection = () => {
        fetch(`${urlBase}/disconnection`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ceva nu a mers bine!");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message);
                props.disconnection();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const removeShow = () => {
        setVisibility(true);
    };

    useEffect(() => {
        if (visibility) {
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse) {
                navbarCollapse.classList.remove("show");
                setIsChecked(false);
            }
            setVisibility(false);
        }
    }, [visibility]);



    return (
        <header style={props.style} className={`w-100  ${props.fileMod}`}>

            <div className="container ps-2 ">

                <nav className="navbar navbar-expand-lg p-0">
                    <Link to={routesBase.home} className="d-flex align-items-center text-decoration-none">
                        <img
                            style={style.imgW}
                            className="img-fluid"
                            src={logoBG}
                            alt="logo-Balan-Andrei">
                        </img>
                        <span
                            className="text-font text-light ms-md-1"
                        >Fotograf Andrei Balan
                        </span>
                    </Link>
                    <button className="navbar-toggler collapsed p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                        <input
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            id="checkbox" />
                        <label
                            htmlFor="checkbox"
                            className='toggle m-0'>
                            <div className='bars' id="bar1"></div>
                            <div className='bars' id="bar2"></div>
                            <div className='bars' id="bar3"></div>
                        </label>
                    </button>

                    <div className="navbar-collapse collapse d-lg-flex justify-content-end mt-2 m-md-0" id="navbarsExample09" >
                        <SwitchButton style='d-lg-none d-sm-block position-absolute end-0 ' />
                        <ul className="navbar-nav  mb-2 mb-lg-0 mt-2 mt-lg-0 card-font ">
                            <li className="nav-item mx-auto">
                                <Link className={`nav-link ${location.pathname === "/" ? theme.border : " "}`} aria-current="page" to={routesBase.home}>Acasă</Link>
                            </li>
                            <li className="nav-item dropdown mx-auto p-0 ">
                                <Link
                                    className={`nav-link px-3 dropdown  dropdown-toggle ${param[1] === "portofoliuFoto" ? theme.border : " "}`} data-bs-toggle="dropdown" aria-expanded="true"
                                >Portofoliu Foto
                                </Link>
                                <ul className={`${theme.bg} bg-dropdown dropdown-menu mt-lg-4 `}>
                                    <li>
                                        <Link
                                            to={routesBase.portofoliuFotoNunti}
                                            onClick={removeShow}
                                            className={`dropdown-item ${theme.bg}`}
                                        >Nunți
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={routesBase.portofoliuFotoBotezuri}
                                            onClick={removeShow}
                                            className={`dropdown-item ${theme.bg}`}
                                        >Botezuri
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={routesBase.portofoliuFotoDiverse}
                                            onClick={removeShow}
                                            className={`dropdown-item ${theme.bg}`}
                                        >Diverse
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item mx-auto ">
                                <Link
                                    to={routesBase.portofoliuVideoDiverse}
                                    className={`nav-link  ${param[1] === "portofoliuVideo" ? theme.border : " "}`} aria-expanded="false"
                                >Portofoliu Video
                                </Link>
                            </li>
                            <li className="nav-item mx-auto ">
                                <Link
                                    to={routesBase.contact}
                                    className={`nav-link  ${param[1] === "contact" ? theme.border : " "}`} aria-expanded="false"
                                >Contact
                                </Link>
                            </li>
                            {props.status ? (
                                <li className="nav-item mx-auto ">
                                    <Link
                                        to={routesBase.controlPanel}
                                        className={`nav-link ${location.pathname === '/controlPanel' ? theme.border : " "}`}
                                    >Încarcă
                                    </Link>
                                </li>) : null}   {props.status ? (
                                    <li className="nav-item mx-auto ">
                                        <Link
                                            to={routesBase.login}
                                            className='nav-link'
                                            onClick={disconnection}
                                        >Deconectare
                                        </Link>
                                    </li>) : null}
                        </ul>
                    </div>
                    <SwitchButton style='d-none d-sm-none d-lg-block ms-2' />
                </nav>
            </div>
        </header>
    );
}

export default Header;



