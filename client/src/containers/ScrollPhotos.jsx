import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';



const ScrollPhotos = ({dataBrut, setSlideNumber, slideNumber, setOpenModal, param}) => {

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



    return (
        <>

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



        </>
    )
}

export default ScrollPhotos;