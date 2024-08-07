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
            video && video.map((onevideo, index) => (

                <section
                    key={index}
                    className="position-relative w-100 h-100">
    
                    {Math.floor((Date.now() - new Date(onevideo.data)) / (7 * 24 * 60 * 60 * 1000)) < 3 &&
                        <svg className="svg-set" width="10mm" height="10mm" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5mm" cy="5mm" r="5mm" fill={theme.mod.sVg} />
                            <text x="50%" y="50%" fontSize="3mm" fill="#ffffff" dominantBaseline="middle" textAnchor="middle">
                                Nou
                            </text>
                        </svg>
                    }
    
                    <iframe className="w-100 h-100"
                        src={onevideo.url}
                        title={`video-${index}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
    
                    {props.status &&
                        <button
                            onClick={() => deleteVideo(onevideo._id)}
                            className="button position-absolute me-1 bottom-0 end-0">
                            <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                    }
                </section>
            ))
        );

    }

    return (

        <section className={theme.mod.bgB}>

            <Header theme={theme} fileMod={theme.mod.bgHeader} />

            <div className="container pb-3">

                <div className="mt-4">
                    <div className="container d-flex mx-auto flex-column align-items-left p-0">

                        <h2 className='title-font'>
                            Portofoliu Video
                            <hr className={`${theme.mod.bg} pt-1 mx-1`} />
                        </h2>

                    </div>
                </div>

                <div className="container d-flex justify-content-end text-center py-4 px-0">
                    <Link
                        to={routesBase.portofoliuFotoBotezuri}
                        className="cta text-decoration-none">
                        <span className={`${theme.mod.contrastText} p-0  hover-underline-animation text-font fs-6`}> Vezi Portofoliu Foto </span>
                    </Link>
                </div>

                <section className="grid-section">
                    {Array.isArray(video) ? videoD() : <Loaders />}
                </section>

            </div>
            <Footer theme={theme} />
            
        </section >
    );
}

export default VideoDetails;
