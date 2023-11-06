import React from "react";
import Slider from 'react-slick';



const Carusel = (props) => {

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
                        <source srcSet="/uploads/carusel--1.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--1lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--1.webp" alt="miri-pe-alee" />
                    </picture>
                </div>

            </div>
            <div>
                <div>
                    <picture >
                        <source srcSet="/uploads/carusel--3.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--3lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--3.webp" alt="dansul-mirilor" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <source srcSet="/uploads/carusel--4.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--4lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--4.webp" alt="mirii-in-biserica" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <source srcSet="/uploads/carusel--5.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--5lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--5.webp" alt="sarutul-mirilor" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <source srcSet="/uploads/carusel--6.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--6lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--6.webp" alt="poza-nunta-parc" />
                    </picture>
                </div>
            </div>
            <div>
                <div>
                    <picture >
                        <source srcSet="/uploads/carusel--8.webp" media="(max-width: 700px)" />
                        <source srcSet="/uploads/carusel--8lg.webp" media="(min-width: 1000px)" />
                        <img className=" mx-auto carusel-img img-fluid" src="/uploads/carusel--8.webp" alt="dansul-mirilor2" />
                    </picture>
                </div>
            </div>

        </Slider>

    );
}
export default Carusel;