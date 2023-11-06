import React from "react";
import Slider from 'react-slick';



const CaruselMobile = (props) => {

    const settings = {
        arrows: false,
        lazyLoad: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear"


    };

    return (

        <Slider   {...settings} className={props.theme.mod.bgHeader} >
            <div>
                <div>
                    <picture >
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--2.webp" alt="foto-nunta-natura" />
                    </picture>
                </div>

            </div>
            <div>
                <div>
                    <picture >
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--7.webp" alt="foto-biserica" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel_2a.webp" alt="foto-biserica" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel_3b.webp" alt="foto-mireasa" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/majorat.webp" alt="foto-majorat" />
                    </picture>
                </div>
            </div>

        </Slider>

    );
}
export default CaruselMobile;