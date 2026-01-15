import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

import { Zoom, Autoplay, EffectFade, Pagination } from 'swiper/modules';

const CaruselMobile = (props) => {

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
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carousel--5mobile.webp" alt="foto1" />
                </picture>
            </SwiperSlide>

             <SwiperSlide>
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carousel--6mobile.webp" alt="foto2" />
                </picture>
            </SwiperSlide>


            <SwiperSlide>
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carousel--8mobile.webp" alt="foto4" />
                </picture>
            </SwiperSlide>

            <SwiperSlide>
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carusel--2.webp" alt="foto5" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carusel--7.webp" alt="foto6" />
                </picture>
            </SwiperSlide>

            <SwiperSlide>

                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/carusel_3b.webp" alt="foto8" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/majorat.webp" alt="foto9" />
                </picture>
            </SwiperSlide>
            
        </Swiper>

    );
}
export default CaruselMobile;