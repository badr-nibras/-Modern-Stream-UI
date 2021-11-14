import './Banners.scss';
import { BsBoxArrowInUpRight } from "react-icons/bs";

//banners
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner4.jpg';
import banner3 from '../../../assets/images/banner3.jpg';

// Swiper 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, {
    Pagination, Autoplay
} from 'swiper/core';

SwiperCore.use([Pagination, Autoplay]);

const Banners = () => {

    const banners = [
        banner1,
        banner2,
        banner3,
    ];

    return ( 
        <Swiper 
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ 
                clickable: true, 
            }}
            autoplay={true}
            className="swiper_banners"
            >
            { banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <div className="event_banner">
                        <img src={ banner } alt="Event banner"/>
                        <div className="overlay"></div>
                        <div className="event_content">
                            <h1>March Big Event</h1>
                            <p>Pubg Mobile Battle Arena II</p>
                            <div className="flex justify-content-between">
                                <span>24/03</span>
                                <a href="{" className="button--link">
                                    More Informations
                                    <BsBoxArrowInUpRight className="button_icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
 
export default Banners;