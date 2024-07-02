// import { CarouselApp } from '../../library'
import { Carousel } from 'antd';

import img1 from '../../assets/images/sl1.png'
import img2 from '../../assets/images/sl2.png'
import img3 from '../../assets/images/sl3.png'

import { ReactComponent as Point } from '../../assets/icons/point-on-map-svgrepo-com.svg'
import { ReactComponent as Delivery } from '../../assets/icons/delivery-svgrepo-com.svg'

import mainImg1 from './imgs/1.jpg'
import mainImg2 from './imgs/2.jpg'
import mainImg3 from './imgs/3.jpg'
import mainImg4 from './imgs/4.jpg'
import mainImg5 from './imgs/5.jpg'
import mainImg6 from './imgs/6.jpg'
import mainImg7 from './imgs/7.jpg'
import mainImg8 from './imgs/8.jpg'
import mainImg9 from './imgs/9.jpg'
import mainImg10 from './imgs/10.jpg'

let sliderImages = [img1, img2, img3]
let mainImages = [mainImg1, mainImg2, mainImg3, mainImg5, mainImg6, mainImg7, mainImg8, mainImg9]

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

    const scrollToWorkshop = () => {
        document.getElementById("workshop-section").scrollIntoView({ behavior: 'smooth' });
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
                                return (
                                    <div key={i} className="main-slider-item">
                                        <img src={image} alt="" />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className="top-right-s-right">
             
                    <div className="top-right-s-right-text">
                        На сьогоднішній день ми пропонуємо своїм клієнтам великий асортимент запчастин до популярних <b>японських і європейських</b> мотоциклів
                    </div>
                    <div className="top-right-s-right-text">
                        <Delivery /> Термін доставки товару, який є в наявності до 2 робочих днів
                    </div>
                    <div className="top-right-s-right-text">
                        <Point /> Київ, Софіївська Борщагівка, вул. Соборна 11
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <button className="bottom-buttons" onClick={scrollToWorkshop}>Наша майстерня</button>
            </div>
            <div id="workshop-section" className="workshop-section">
                <div className="workshop-images">
                    {mainImages.map((image, index) => (
                        <img key={index} src={image} alt={`mainImg${index + 1}`} className="workshop-image" />
                    ))}
                </div>
            </div>
        </div>
    );
}
