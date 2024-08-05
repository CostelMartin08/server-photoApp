import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSwipeable } from 'react-swipeable';

const ScrollPhotos = ({ dataBrut, setSlideNumber, slideNumber, setOpenModal, param }) => {

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

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (

        <div className="sliderWrap">

            <section className='position-element'>

                <div className="fullScreenImage">

                    <TransformWrapper
                        smooth={true}
                        disablePadding={true}
                        initialScale={1}>

                        {({ zoomIn, resetTransform }) => (

                            <React.Fragment>
                                <div className="control-button d-flex gap-3">

                                    <button
                                        onClick={() => zoomIn()}>
                                        <i className="fa-solid fa-magnifying-glass-plus fa-xl"></i>
                                    </button>

                                    <button onClick={() => resetTransform()}>
                                        <i className="fa-solid fa-magnifying-glass-minus fa-xl"></i>
                                    </button>

                                    <button onClick={handleCloseModal}>
                                        <i className="fa-solid fa-xmark fa-2xl"></i>
                                    </button>

                                </div>

                                <TransformComponent
                                    onDoubleClick={zoomIn}>

                                    <div {...handlers}>
                                        <img
                                            src={`https://balanandrei.ro/images/${param[2]}/${dataBrut.title}/${dataBrut.content[slideNumber]}`}
                                            alt={`galery${dataBrut.content[slideNumber]}`}
                                        />

                                    </div>

                                </TransformComponent>


                                <div className="d-flex arrows-bg justify-content-around">
                                    <div className='p-3'>
                                        <button
                                            onClick={prevSlide}
                                            className="bg-transparent border-0">
                                            <i className="fa-solid fa-arrow-left fa-lg text-light"></i>
                                        </button>
                                    </div>
                                    <div className='p-3'>
                                        <button
                                            onClick={nextSlide}
                                            className="bg-transparent border-0">
                                            <i className="fa-solid fa-arrow-right fa-lg text-light"></i>
                                        </button>
                                    </div>
                                </div>

                            </React.Fragment>
                        )}

                    </TransformWrapper>

                </div>

            </section>

        </div>
    )
}

export default ScrollPhotos;