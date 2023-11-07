import React, { useEffect, useState, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import Loaders from '../components/Loaders';
import Header from '../containers/Header';
import Footer from '../components/Footer';
import { urlBase } from '../scripts/url';
import './albumDetails.css';
import { useTheme } from '../scripts/useTheme';


const AlbumDetails = () => {
    const { title } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const param = location.pathname.split('/');
    const theme = useTheme();
    const paramS = param[2];
    const [loading, setLoading] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const gridRef = useRef(null);

    //Evenimentul
    const [dataBrut, setDataBrut] = useState({});

    const data = dataBrut.title === title;

    useEffect(() => {

        if (dataBrut) {

            setLoading(true);
            const grid = gridRef.current;

            if (grid) {
                const masonryInstance = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                });
                const imagesLoadedInstance = imagesLoaded(grid);

                imagesLoadedInstance.on('always', () => {
                    masonryInstance.layout();
                });

                return () => {
                    imagesLoadedInstance.off('always');
                    setLoading(false);
                };
            }
        }
    }, [loading, dataBrut]);


    useEffect(() => {
        if (!data) {
            const timer = setTimeout(() => {
                navigate("/notFound");
            }, 5000);

            return () =>

                clearTimeout(timer);
        }
    }, [dataBrut, data, navigate]);

    const getData = async (even, title) => {
        try {
            const response = await fetch(`${urlBase}/galerie/${even}/${title}`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setDataBrut(data);
            } else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        getData(paramS, title);


    }, [paramS, title]);



    const handleOpenModal = (indexu) => {
        setSlideNumber(indexu);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const prevSlide = () => {
        setSlideNumber((prevNumber) => {
            const newNumber = prevNumber === 0 ? dataBrut.content.length - 1 : prevNumber - 1;
            return newNumber;
        });
    };


    const nextSlide = () => {
        setSlideNumber((prevNumber) => {
            const newNumber = prevNumber + 1 === dataBrut.content.length ? 0 : prevNumber + 1;
            return newNumber;
        });
    };

    const url = `${param[2]}/${dataBrut.title ? dataBrut.title : null}/${dataBrut.content ? dataBrut.content[0] : null}`;
    const existingURL = encodeURIComponent(url) ?? 'defaultURL';


    return (
        <section className={theme.mod.bgB}>

            <Header
                theme={theme}
                fileMod={theme.mod.bgHeader} />

            <main className={`${theme.mod.bgB}`}>

                {data && dataBrut ? (
                    <>
                        <div className="banner position-relative">
                            <div
                                className="bg-albumdetails"
                                style={{ backgroundImage: `url(https://balanandrei.ro/images/${existingURL})` }}>
                            </div>
                            <div className='bg-content'>
                                <h3
                                    className="title-font mb-2">
                                    {dataBrut.title}
                                </h3>
                                <p
                                    className="text-font">
                                    {dataBrut.description}
                                </p>
                            </div>
                        </div>
                        {openModal && (

                            <div className="sliderWrap  p-0">

                                <div className="fullScreenImage vh-100">

                                    <TransformWrapper initialScale={1}>
                                        {({ zoomIn, resetTransform }) => (

                                            <React.Fragment>
                                                <div className="w-100 text-right mb-1">

                                                    <button className="me-2 btn text-light"
                                                        onClick={() => zoomIn()}>
                                                        <i className="fa-solid fa-magnifying-glass-plus fa-xl"></i>
                                                    </button>

                                                    <button
                                                        className="me-2 btn text-light"
                                                        onClick={() => resetTransform()}>
                                                        <i className="fa-solid fa-magnifying-glass-minus fa-xl"></i>
                                                    </button>

                                                    <button
                                                        className="me-1 btn text-light"
                                                        onClick={handleCloseModal}>
                                                        <i className="fa-solid fa-xmark fa-2xl"></i>
                                                    </button>

                                                </div>
                                                <TransformComponent onDoubleClick={zoomIn}>
                                                    <img
                                                        className="mx-auto img-fluid"
                                                        src={`https://balanandrei.ro/images/${param[2]}/${dataBrut.title}/${dataBrut.content[slideNumber]}`}
                                                        alt={`galery${dataBrut.content[slideNumber]}`}
                                                    />
                                                    <div className="arrows-bg d-flex justify-content-around">
                                                        <div className='px-5'>
                                                            <button onClick={prevSlide}
                                                                className="cta px-5 ">
                                                                <i className="fa-solid fa-arrow-left fa-lg text-light"></i>
                                                            </button>
                                                        </div>
                                                        <div className='px-5'>
                                                            <button
                                                                onClick={nextSlide}
                                                                className="cta px-5">
                                                                <i className="fa-solid fa-arrow-right fa-lg text-light"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </TransformComponent>

                                            </React.Fragment>
                                        )}
                                    </TransformWrapper>
                                </div>
                            </div>
                        )}
                        <div className="container-fluid">
                            {loading ?
                                <div className="masonry-grid mx-auto" ref={gridRef}>


                                    {dataBrut.content &&
                                        dataBrut.content.map((slide, indexu) => (

                                            <div className='grid-sizer'>

                                                <div
                                                    className="grid-item"
                                                    key={indexu}
                                                    onClick={() => handleOpenModal(indexu)}>
                                                    <img
                                                        className="photo-grid "
                                                        src={`https://balanandrei.ro/images/${param[2]}/${dataBrut.title}/${slide}`}
                                                        alt={`poza${indexu}`}
                                                    />
                                                </div>

                                            </div>
                                        ))}
                                </div> : <Loaders />}
                        </div>
                    </>
                ) : (
                    <Loaders />
                )}
            </main>

            <Footer
                theme={theme}
            />
        </section >
    );
}

export default AlbumDetails;
