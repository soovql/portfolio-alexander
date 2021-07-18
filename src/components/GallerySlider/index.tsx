import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyLoad from 'react-lazyload';
import { useEffect, useState } from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';
import { Modal } from './Modal';
import { GalleryTypes } from '../../GalleryTypes';
import * as NATURE_DATA from '../../nature.json';
import * as CITY_DATA from '../../city.json';
import {useSwipeable} from "react-swipeable";

SwiperCore.use([Pagination, Navigation]);

type IGallerySliderProps = {
    templates: { (arg0: number): { (): any; new (): any; default: string | undefined }; keys: () => number[] };
    open: boolean;
    setActive: (v: React.SetStateAction<number>) => void;
    type: GalleryTypes;
};

const GallerySlider = React.forwardRef<HTMLDivElement, IGallerySliderProps>(function Slider(props, ref) {
    const { templates, open, setActive, type, ...rest  } = props;
    // слайд, с которого начинается карусель
    const initial_slide = 4;
    // считаем количество слайдов для скролла
    const total_amount = templates.keys().length;
    const amount_of_pictures = total_amount - 1;
    const based_animation_transition = 500;

    const [slideIndex, setSlideIndex] = useState(initial_slide);
    const [swiper, setSwiper] = useState<any>(null);
    const [modalOpened, showModal] = useState(false);

    const TEXT = (type === "City" ? CITY_DATA : NATURE_DATA);

    //SWIPE FOR THE BORDER FRAME
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            swiper.slideTo(swiper.realIndex + 1);
        },
        onSwipedRight: () => {
            swiper.slideTo(swiper.realIndex - 1);
        },
    });


    useEffect(() => {
        setTimeout(() => {
            let previous_previous;
            let previous_previous_previous;

            const center = document.getElementsByClassName('swiper-slide-active')[0] as HTMLElement;
            const previous = document.getElementsByClassName('swiper-slide-prev')[0] as HTMLElement;
            const all_slides = document.querySelectorAll('.swiper-slide');

            if (center.dataset.swiperSlideIndex !== '0') {
                for (let i = 0; i < all_slides.length; i++) {
                    all_slides[i].classList.remove('swiper-slide-prev-prev');
                    all_slides[i].classList.remove('swiper-slide-prev-prev-prev');
                }
                previous_previous = previous.previousSibling as HTMLElement;
                previous_previous?.classList.add('swiper-slide-prev-prev');
                if (previous_previous) {
                    previous_previous_previous = previous_previous.previousSibling as HTMLElement;
                    previous_previous_previous?.classList.add('swiper-slide-prev-prev-prev');
                }
            }
        }, 10);
    }, [slideIndex]);

    useEffect(() => {
        const center = document.getElementsByClassName('pictureBorderFrame')[0] as HTMLElement;
        center.addEventListener('click', () => showModal(true), false);
    }, [modalOpened]);

    const runInit = () => {
        setTimeout(() => {
            const center = document.getElementsByClassName('swiper-slide-active')[0] as HTMLElement;
            center.classList.add('init');
        }, 10);
    };

    useEffect(() => {
        const close = (e: { keyCode: number; }) => {
            if (!modalOpened && document.activeElement?.tagName === "INPUT") {
                if(e.keyCode === 13){
                    showModal(!modalOpened);
                }
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[showModal, modalOpened])

    {
        const arr = templates.keys();
        arr.sort(function(a, b) {
            return a - b;
        });

    }
    const renderGalleryItems = () => {
        return templates.keys().map((elem: number, i: number) => (
            <SwiperSlide
                key={i}
                virtualIndex={i}
                onClick={
                    (el) => {
                        if (el !== null && el.target instanceof HTMLElement) {
                            swiper.slideTo(el.target.dataset.swiperSlideIndex);
                        }
                    }
                }
            >
                <div className="imageContainer">
                    <div className="extraWrapper">
                        <LazyLoad>
                            <img
                                className="picture"
                                key={elem}
                                src={templates(elem).default}
                                alt={TEXT[i] ? TEXT[i].title : 'Саша Стюхин Пейзажист'}
                                data-swiper-slide-index={i}
                            />
                        </LazyLoad>
                        <div className="pictureBorder" />
                    </div>
                </div>

                {(!open && TEXT[i]) && (
                    <div className={textBlock_class}>
                        <div className="title">{TEXT[i].title}</div>
                        <div className="location">{TEXT[i].location}</div>
                    </div>
                )}
            </SwiperSlide>
        ));
    };

    const gallery_class = cn('gallerySlider')({"type": type.toLowerCase()}, [open ? 'blurred' : undefined]);
    const input_class = cn('input')({"type": type.toLowerCase()});
    const textBlock_class = cn('textBlock')({"type": type.toLowerCase()});

    return (
        <>
            <div
                {...rest}
                className={gallery_class}
                ref={ref}
            >
                <div
                    className="pictureBg"
                />
                <div className="pictureBorderFrame" {...handlers}/>

                <Swiper
                    onInit={() => runInit()}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    allowTouchMove={window.innerWidth < 599}
                    simulateTouch={true}
                    initialSlide={initial_slide}
                    grabCursor={false}
                    spaceBetween={0}
                    speed={1000}
                    centeredSlides={true}
                    slidesPerView="auto"
                    onSlideChange={(swiper) => {
                        setSlideIndex(swiper.realIndex);
                        setActive(swiper.realIndex);
                    }}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    // slideToClickedSlide={true}
                >
                    {renderGalleryItems()}
                </Swiper>
            </div>

            {!open && (
                <input
                    className={input_class}
                    onChange={(e) => swiper.slideTo(Number(e.target.value), based_animation_transition)}
                    value={slideIndex}
                    type="range"
                    min={0}
                    max={amount_of_pictures}
                />
            )}

            <Modal
                parentClass="gallerySlider"
                slideIndex={slideIndex}
                templates={templates}
                open={modalOpened}
                setOpen={showModal}
                type={type}
            />
        </>
    );
});

export { GallerySlider };
