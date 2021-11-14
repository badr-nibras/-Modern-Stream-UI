import './CommingEvents.scss';
import {
    IoIosArrowForward,
    IoIosArrowBack
} from 'react-icons/io';
//images
/*import event1 from '../../../assets/images/event1.jpg';
import event2 from '../../../assets/images/event2.jpg';
import event3 from '../../../assets/images/event3.jpg';
*/
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css"

import SwiperCore, {
    Autoplay, Navigation
} from 'swiper/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

SwiperCore.use([Autoplay, Navigation]);

const CommingEvents = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ENDPOINT + '/api/events/')
            .then(res => {
                setEvents(res.data)
            })
    })

    return (
        <section className="events section" id="events">
            <h2 className="section_title">Comming Events</h2>
            <p className="section_subtitle">Make sure you attend those events !</p>
            <div className="events_container container flex">
                <div className="prev"><IoIosArrowBack /></div>
                <Swiper
                    navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                    }}
                    loop={true}
                    autoplay={true}
                    slidesPerView={1}
                >

                    {events.map((event, index) => (
                        <SwiperSlide key={index}>
                            <div className="event_content">
                                <img src={event.miniature} alt="Event" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="next"><IoIosArrowForward /></div>
            </div>
        </section>
    );
}

export default CommingEvents;