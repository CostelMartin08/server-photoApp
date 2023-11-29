import React from "react";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import Loaders from "../components/Loaders";
import { useState, useEffect } from "react";
import { urlBase } from "../scripts/url";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { routesBase } from "../scripts/routes";
import { useTheme } from "../scripts/useTheme";

const VideoDetails = (props) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [video, setVideo] = useState([]);
    const [update, setUpdate] = useState(false);
    const theme = useTheme();

    const style = {
        videoSize: {
            width: "530px",
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${urlBase}/galerie/video`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Ceva nu a mers bine');
                }
                const data = await response.json();
                setVideo(data);
            } catch (error) {
                console.error('Eroare la incarcarea videoclipurilor!');
            }
        };

        fetchData();

        return () => {
            setVideo([]);
            setUpdate(false);
        };
    }, [update]);


    const deleteVideo = async (url) => {
        try {
            await fetch(`${urlBase}/delete/${url}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
            setUpdate(true);
        } catch (error) {
            console.error('Eroare la stergerea evenimentului!');
            props.logout();
            navigate('/login');
        }
    };

    const videoD = () => {
        return (
            video ? video.map((onevideo, index) => (

                <div
                    key={index}
                    className="d-flex my-3 col-md-6 p-0 justify-content-center align-items-center">
                    <div className="ms-1 position-relative" style={style.videoSize}>


                        {Math.floor((Date.now() - onevideo.data) / (7 * 24 * 60 * 60 * 1000)) < 3 ?
                            <svg className="svg-set" width="10mm" height="10mm" xmlns="http://www.w3.org/2000/svg">

                                <circle cx="5mm" cy="5mm" r="5mm" fill={theme.mod.sVg} />

                                <text x="50%" y="50%" font-size="3mm" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">
                                    Nou
                                </text>

                            </svg>
                            : null
                        }


                        <iframe
                            className="video-size"
                            src={onevideo.url}
                            title={onevideo.url}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>

                        {props.status ?
                            <button
                                onClick={() => deleteVideo(onevideo._id)}
                                className="button position-absolute me-1 bottom-0 end-0">
                                <i className="fa-solid fa-trash fa-xl"></i>
                            </button>
                            : null}
                    </div>
                </div>
            )
            ) : <Loaders />)

    }

    return (
        <section className={theme.mod.bgB}>
            <Header theme={theme} fileMod={theme.mod.bgHeader} />
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 align-items-center justify-content-center p-0">
                        <div className="container d-flex mx-auto flex-column align-items-left  p-0">
                            <h2 className={`title-font ms-3`}>
                                Portofoliu Video
                                <hr className={`${theme.mod.bg} pt-1 mx-1`} />
                            </h2>
                        </div>
                    </div>
                    <div className=" container d-flex justify-content-end text-center  py-4">
                        <Link
                            to={routesBase.portofoliuFotoBotezuri}
                            className="cta text-decoration-none">
                            <span className={`${theme.mod.contrastText} p-0  hover-underline-animation text-font fs-6`}> Vezi Portofoliu Foto </span>
                        </Link>
                    </div>
                    {Array.isArray(video) ? videoD() : <Loaders />}
                </div>

            </div>
            <Footer theme={theme} />
        </section >
    );
}

export default VideoDetails;
