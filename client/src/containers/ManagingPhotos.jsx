import React, { useState, useEffect, useRef } from 'react';
import Loaders from '../components/Loaders';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import DeleteCardConfirm from '../containers/DeleteCard';

const PhotoSet = ({ loading, setLoading, dataBrut, param, setSlideNumber, setOpenModal, refresh }) => {


    const gridRef = useRef(null);
    const status = localStorage.getItem('status');
    const [visibility, setVisibility] = useState();
    const [paramForMeniu, setParamForMeniu] = useState(null);
    const [titleForMeniu, setTitleForMeniu] = useState(null);

    useEffect(() => {

        if (dataBrut) {

            setLoading(true);
            setVisibility(false);
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



    const handleOpenModal = (indexu) => {
        setSlideNumber(indexu);
        setOpenModal(true);
    };


    const deleteOne = (param, title) => {

        setVisibility(true);
        setParamForMeniu(param);
        setTitleForMeniu(title);

    }

    const url = `${param[2]}/${dataBrut.title ? dataBrut.title : null}/${dataBrut.content ? dataBrut.content[0] : null}`;
    const existingURL = encodeURIComponent(url) ?? 'defaultURL';

    return (
        <>
            {visibility ?

                <DeleteCardConfirm

                    titleForMeniu={titleForMeniu}
                    paramForMeniu={paramForMeniu}
                    setVisibility={setVisibility}
                    refresh={refresh}

                /> :

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


                    {loading ?

                        <div className="masonry-grid mx-auto" ref={gridRef}>

                            {dataBrut.content &&
                                dataBrut.content.map((slide, indexu) => (

                                    <div
                                        className='grid-sizer'
                                        key={indexu}>

                                        <div
                                            className="grid-item">
                                            {status ?

                                                <button
                                                    onClick={() => deleteOne(slide, dataBrut.title)}

                                                    className='btn-delete-one btn btn-danger'><i className="fa-solid fa-trash"></i>
                                                </button>
                                                
                                                : null}

                                            <img
                                                onClick={() => handleOpenModal(indexu)}
                                                className="photo-grid "
                                                src={`https://balanandrei.ro/images/${param[2]}/${dataBrut.title}/${slide}`}
                                                alt={`poza${indexu}`}
                                            />

                                        </div>

                                    </div>
                                ))
                            }

                        </div> :

                        <Loaders />
                    }

                </>
            }
        </>
    )
}


export default PhotoSet;