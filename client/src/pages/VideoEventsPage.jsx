import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../scripts/useTheme";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import Loaders from "../components/Loaders";
import { routesBase } from "../scripts/routes";
import { urlBase } from '../scripts/url';
import './video.css';
import button from './button.svg';
import playButton from './playButton.svg';

const VideoDetails = (props) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { category } = useParams();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const validCategories = ["Nunti", "Botezuri", "Comercial"];

    const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

    useEffect(() => {
        if (!validCategories.includes(category)) {
            navigate("/notFound");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`${urlBase}/galerie/video/${category}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Nu s-au găsit videoclipuri în această categorie!');
                    } else {
                        throw new Error('Ceva nu a mers bine');
                    }
                }

                const data = await response.json();
                setVideo(data);
                setError(null);

                const loadingTime = data.length > 0 ? 2000 : 5000;

                setTimeout(() => {
                    setLoading(false);
                }, loadingTime);

            } catch (error) {
                console.error('Eroare la încărcarea videoclipurilor:', error);
                setError(error.message);

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            }
        };

        fetchData();
    }, [category, navigate, update]);

    const deleteVideo = async (id) => {
        try {
            await fetch(`${urlBase}/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
            setUpdate(true);
        } catch (error) {
            console.error('Eroare la ștergerea videoclipului:', error);
            props.logout();
            navigate('/login');
        }
    };

    const handlePlay = (index) => {
       
        setPlayingVideoIndex(index);
    };

    return (
        <section className={`${theme.mod.bgB}`}>
            <Header theme={theme} fileMod={theme.mod.bgHeader} />

            <div className="container pb-3">
                <div className="mt-4">
                    <div className="container mt-5 d-flex mx-auto flex-column align-items-left p-0">
                        <h2 className="title-font">
                            Portofoliu Video - {category}
                            <hr className={`${theme.mod.bg} pt-1 mx-1`} />
                        </h2>
                    </div>
                </div>

                {loading && <Loaders />}

                {!loading && error && (
                    <div className="text-center vh-100">
                        <p className="text-danger">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="row g-4">
                        {video.length > 0 ? (
                            video.map((onevideo, index) => (
                                <div key={index} className="col-sm-12 col-md-6 col-lg-6 position-relative">
                                    <div className="shadow p-3 rounded-3 card-video-sp">

                                        {Math.floor((Date.now() - new Date(onevideo.data)) / (7 * 24 * 60 * 60 * 1000)) < 3 && (
                                            <svg
                                                className="svg-set"
                                                width="10mm"
                                                height="10mm"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle cx="5mm" cy="5mm" r="5mm" fill={theme.mod.sVg} />
                                                <text
                                                    x="50%"
                                                    y="50%"
                                                    fontSize="3mm"
                                                    fill="#ffffff"
                                                    dominantBaseline="middle"
                                                    textAnchor="middle"
                                                >
                                                    Nou
                                                </text>
                                            </svg>
                                        )}

                                        <div className="iframe-container w-100 position-relative">
                                            <section>
                                                {playingVideoIndex !== index && onevideo.thumbnail && (
                                                    <div
                                                        className="thumbnail-overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                                                        onClick={() => handlePlay(index)}
                                                        style={{
                                                            backgroundImage: onevideo.thumbnail ? `url(/portofoliuVideo/${onevideo.thumbnail})` : "none",
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            cursor: "pointer",
                                                            zIndex: 2
                                                        }}
                                                    >
                                                        <button className="play-button">
                                                            <img src={playButton} alt="play"/>
                                                        </button>
                                                    </div>
                                                )}

                                                <iframe
                                                    src={playingVideoIndex === index ? onevideo.url : ""}
                                                    title={`video-${index}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    className="iframe-responsive"
                                                    style={{ zIndex: 1 }}
                                                ></iframe>

                                            </section>

                                            <div className="mt-2">
                                                <h5 className="card-title">{onevideo.title === "null" ? "" : onevideo.title}</h5>
                                                <p className="card-text">{onevideo.description === "null" ? "" : onevideo.description}</p>
                                            </div>
                                        </div>

                                    </div>

                                    {props.status && (
                                        <button
                                            onClick={() => deleteVideo(onevideo._id)}
                                            className="button position-absolute me-3 bottom-0 end-0"
                                        >
                                            <i className="fa-solid fa-trash fa-xl"></i>
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="vh-100 text-center">Nu există videoclipuri în această categorie.</p>
                        )}
                    </div>
                )}

                <div className="container d-flex justify-content-end text-center py-4 px-0">
                    <Link
                        to={routesBase.portofoliuFotoBotezuri}
                        className="cta btn-apart text-decoration-none"
                    >
                        <span className={`${theme.mod.contrastText} p-0 text-font fs-6`}>
                            Vezi Portofoliu Foto <img src={button} alt="button" />
                        </span>
                    </Link>
                </div>
            </div>

            <Footer theme={theme} />
        </section>
    );
};

export default VideoDetails;
