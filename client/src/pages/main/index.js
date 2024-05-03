import { CarouselApp } from '../../library'
import { Carousel } from 'antd';

import img1 from '../../assets/images/sl1.png'
import img2 from '../../assets/images/sl2.png'
import img3 from '../../assets/images/sl3.png'

import { ReactComponent as Point } from '../../assets/icons/point-on-map-svgrepo-com.svg'
import { ReactComponent as Delivery } from '../../assets/icons/delivery-svgrepo-com.svg'

let sliderImages = [img1, img2, img3]

const contentStyle = {
    margin: 0,
    color: '#fff',
    width: '100%',
    background: '#364d79',
    textAlign: 'center',
};

export default function Main(params) {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <div>
            <div className="top-section">
                <div className="top-left-s-left">
                    <div className="top-left-s-title">
                        THE BIKER
                    </div>
                    <div className="top-left-s-subtitle">
                        Запасні запчастини та аксесуари
                    </div>
                    <div className="top-left-s-slider">
                        {/* <CarouselApp sliderImages={sliderImages}/> */}
                        <Carousel
                            afterChange={onChange}
                            autoplay
                            className="main-slider"
                            dotsClass="dots-style"
                        >
                            {sliderImages.map((image, i) => {
                                return (<div key={i} className="main-slider-item">
                                    <img src={image} alt="" />
                                </div>)
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className="top-right-s-right">
                    <div className="top-right-s-right-title">
                        Двигуни в зборі
                    </div>
                    <div className="top-right-s-right-text">
                        На сьогоднішній день ми пропонуємо своїм клієнтам великий асортимент запчастин до популярних <b>японських і європейських</b> мотоциклів
                    </div>
                    <div className="top-right-s-right-text">
                        <Delivery />  Термін доставки товару, який є в наявності до 2 робочих днів
                    </div>
                    <div className="top-right-s-right-text">
                        <Point /> Київ, Софіївська Борщагівка, вул. Соборна 11
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <button className="bottom-buttons">виготовлення захисту</button>
                <button className="bottom-buttons">фарбування та обклеювання мотоциклів</button>
                <button className="bottom-buttons">ремонт мотоциклів</button>
            </div>
        </div>
    )
}