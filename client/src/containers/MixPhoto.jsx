import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlBase } from "../scripts/url";
import { routesBase } from "../scripts/routes";


const MixPhoto = (props) => {


    const imageBaseUrl = "https://balanandrei.ro/images/";
    const classNm = 'position-absolute text-light end-0 bottom-0 card-font me-4 mb-3 h5';
    const theme = props.theme.mod;
    const [data, setdata] = useState([]);
    const [final, setfinal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${urlBase}/allContent`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setdata(data);
                setfinal(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            setdata([]);
            setfinal(false);
        };
    }, []);




    return (
        <section className={theme.bgB}>
            <div className="container d-flex flex-column align-items-left pt-3">
                <h2 className={`title-font h3 ${theme.contrastText}`} >
                    Ce îți ofer eu ca fotograf
                    <hr className={`${theme.bg} pt-1`} />
                </h2>
            </div>

            {final ?
                <div className="mx-auto container row g-5">
                    <div className="col-12  ">
                        <div className="row justify-content-center justify-content-lg-left align-items-center">
                            <div className="col-lg-6 ">
                                <Link
                                    className="cardMix  shadow"

                                    to={`${routesBase.portofoliuFotoNunti}/${data[0].title ? data[0].title : routesBase.portofoliuFotoNunti}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}Nunti/${data[0].title}/${data[0].content}`}
                                        alt={`${data[0].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[0].title}>
                                        {data[0].title}
                                    </span>
                                </Link>
                            </div>
                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Fotografie de Nuntă</h2>
                                <p className="ms-md-2  text-font-mix text-md-left">
                                    Nunta este făra dar și poate unul din cele mai importante evenimente din viața de cuplu. Însăși însemnătatea și încărcătura emoțională
                                    din jurul acestei zile cer ca  fotograful să fie atent la detalii, dinamic și cu experiența. Îmi dau interesul și încerc să pun suflet
                                    în ceea ce fac, pentru ca povestea nunții voastre să fie spusă cât mai frumos și sincer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12  g-5">
                        <div className="row align-items-center flex-md-row-reverse ">

                            <div className="col-lg-6  position-relative">
                                <Link
                                    className="cardMix shadow "

                                    to={`${routesBase.portofoliuFotoBotezuri}/${data[1].title ? data[1].title : routesBase.portofoliuFotoBotezuri}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}Botezuri/${data[1].title}/${data[1].content}`}
                                        alt={`${data[1].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[1].title}>
                                        {data[1].title}
                                    </span>
                                </Link>
                            </div>

                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Fotografie de Botez</h2>
                                <p className="ms-md-2  text-md-left text-font-mix">
                                    Fiecare fotografie este o poveste în sine, în care emoțiile și fericirea din ziua botezului sunt imortalizate în imagini de o
                                    frumusețe uluitoare. De la priviri încântate la gesturi tandre și zâmbete nevinovate, aceste cadre prețioase surprind esența pură
                                    a acestui eveniment religios și familial.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 g-5  ">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6">
                                <Link
                                    className="cardMix shadow"

                                    to={`${routesBase.portofoliuFotoDiverse}/${data[2].title ? data[2].title : routesBase.portofoliuFotoDiverse}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}Diverse/${data[2].title}/${data[2].content}`}
                                        alt={`${data[2].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[2].title}>
                                        {data[2].title}
                                    </span>
                                </Link>
                            </div>
                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Diverse</h2>
                                <p className="ms-md-2  text-md-left text-font-mix">
                                    Deoarece îmi place să încerc lucruri noi și să-mi pun spontaneitatea și creativitatea la treaba, surprind și diverse
                                    alte evenimente (majorate, petreceri private și nu numai), dar cochetez și cu fotografia de portret și cea culinară.
                                </p>
                            </div>
                        </div>
                    </div>

                </div> : null}

            <div className="container d-flex justify-content-end text-center mt-3 ">
                <Link
                    to={routesBase.portofoliuFotoNunti}
                    className='cta me-3 me-md-0 mb-3 text-decoration-none'>
                    <span className={`${theme.contrastText} pe-0 hover-underline-animation text-font fs-6`}> Vezi mai multe </span>

                </Link>
            </div>
        </section>
    );
};

export default MixPhoto;
