import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

import { Zoom, Autoplay, EffectFade, Pagination } from 'swiper/modules';

const Carusel = (props) => {

    return (

        <Swiper
            style={{
                '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={0}
            effect={'fade'}
            zoom={true}
            modules={[Zoom, EffectFade, Pagination, Autoplay]}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            className={props.theme.mod.bgHeader} >
            <SwiperSlide>

                <picture className='swiper-zoom-container'>
                    <source srcSet="/uploads/carusel--1.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--1lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--1.webp" alt="miri-pe-alee" />
                </picture>


            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container" >
                    <source srcSet="/uploads/carusel--3.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--3lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--3.webp" alt="dansul-mirilor" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container" >
                    <source srcSet="/uploads/carusel--4.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--4lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--4.webp" alt="mirii-in-biserica" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container" >
                    <source srcSet="/uploads/carusel--5.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--5lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--5.webp" alt="sarutul-mirilor" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container" >
                    <source srcSet="/uploads/carusel--6.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--6lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--6.webp" alt="poza-nunta-parc" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>
                <picture className="swiper-zoom-container" >
                    <source srcSet="/uploads/carusel--8.webp" media="(max-width: 700px)" />
                    <source srcSet="/uploads/carusel--8lg.webp" media="(min-width: 1000px)" />
                    <img loading="lazy" className="carusel-img img-fluid" src="/uploads/carusel--8.webp" alt="dansul-mirilor2" />
                </picture>

            </SwiperSlide>

        </Swiper>

    );
}
export default Carusel;