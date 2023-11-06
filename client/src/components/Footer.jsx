import React from "react";
import logo from "./photo/logo-bg.png";
import { Link } from 'react-router-dom';
import './details.css'
import { routesBase } from "../scripts/routes";

const Footer = (props) => {

    const theme = props.theme.mod;

    const style = {
        creator: {
            backgroundColor: 'rgb(28 31 29)',
        }
    }

    return (
        <footer className={`pt-3 ${theme.bgHeader}`}>
            <div className="container">
                <div className="row">
                    <Link to={routesBase.home} className="text-decoration-none col-12 col-md-4  d-flex align-items-center justify-content-center flex-column flex-md-row justify-content-md-start ps-2">
                        <img
                            className="img-fluid"
                            src={logo}
                            alt="logo"
                            width={"80px"}>
                        </img>

                        <span
                            className="text-font text-light ms-md-1"
                        >Fotograf Andrei Balan
                        </span>

                    </Link>
                    <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                        <ul className="text-center p-0 py-3 py-md-0 m-0">
                            <li>
                                <small
                                    className="text-white"
                                >+40742490856
                                </small>
                            </li>
                            <li>
                                <small
                                    className="text-white">
                                    <em>andreib3100@gmail.com</em>
                                </small>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                        <ul className="p-0 m-0">
                            <li>
                                <a
                                    href="https://www.instagram.com/andrei.vdr/"
                                    type="button"
                                    className="btn text-light">
                                    <i
                                        className="fa-brands fa-instagram fa-xl">
                                    </i>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100065019240579"
                                    type="button"
                                    className="btn text-light">
                                    <i
                                        className="fa-brands fa-facebook fa-xl">
                                    </i>
                                </a>
                                <a href="https://www.youtube.com/@andrei_balan"
                                    type="button"
                                    className="btn text-light">
                                    <i
                                        className="fa-brands fa-youtube fa-xl">
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${theme.creator} mt-3 py-3`}>
                <div className="container d-flex justify-content-center justify-content-md-start">
                    <p className="m-0 ">Realizat de <a className="text-success" href='https://www.instagram.com/costelmartinescu/'>Costel Martinescu</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;