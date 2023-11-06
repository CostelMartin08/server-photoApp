import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
import { routesBase } from "../scripts/routes";

const PageNotFound = () => {



    return (
        <section className="page_404 vh-100 vw-100">
            <div className="col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                    <h1 className="text-center card-font text-dark ">404</h1>
                </div>
                <div className="contant_box_404">
                    <h3 className="h2 card-font text-dark">
                        Se pare că te-ai pierdut
                    </h3>

                    <p className="card-font text-dark">pagina pe care o cauți nu este disponibilă!</p>
                    <Link
                        to={routesBase.home}
                        type="button"
                        className="text-font btn btn-secondary"
                    >Acasa
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default PageNotFound;