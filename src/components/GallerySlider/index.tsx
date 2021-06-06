import * as React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import * as TEXT from '../../nature.json';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';
import { Modal } from './Modal';

SwiperCore.use([Pagination, Navigation]);

type IGallerySliderProps = {
    templates: { (arg0: number): { (): any; new (): any; default: string | undefined }; keys: () => number[] };
    open: boolean;
    setActive: (v: number) => void;
};

const GallerySlider = React.forwardRef<HTMLDivElement, IGallerySliderProps>(function Slider(props, ref) {
    const { templates, open, setActive } = props;
    // слайд, с которого начинается карусель
    const initial_slide = 4;
    // считаем количество слайдов для скролла
    const total_amount = templates.keys().length;
    const amount_of_pictures = total_amount - 1;
    const based_animation_transition = 500;
    // считаем длину и передаем её в css инпута
    const input_width = 22 * total_amount;

    const [slideIndex, setSlideIndex] = useState(initial_slide);
    const [swiper, setSwiper] = useState<any>(null);
    const [modalOpened, showModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            let previous_previous;

            const center = document.getElementsByClassName('swiper-slide-active')[0] as HTMLElement;
            const previous = document.getElementsByClassName('swiper-slide-prev')[0] as HTMLElement;
            const all_slides = document.querySelectorAll('.swiper-slide');

            if (center.dataset.swiperSlideIndex !== '0') {
                for (let i = 0; i < all_slides.length; i++) {
                    all_slides[i].classList.remove('swiper-slide-prev-prev');
                }
                previous_previous = previous.previousSibling as HTMLElement;
                previous_previous?.classList.add('swiper-slide-prev-prev');
            }

            // так hover не активируется во время перелистывания
            // setTimeout(() => {
            //     const center_slide = (document.getElementsByClassName('swiper-slide-active')[0]) as HTMLElement;
            //     center_slide.classList.add('hovering');
            //     return [];
            // }, 2000)
            // const previous_previous_previous = previous_previous.previousSibling as HTMLElement;
            // const next_next = next.nextElementSibling as HTMLElement;
            // const next_next_next = next_next.nextElementSibling as HTMLElement;

            // previous.setAttribute("class", "");
            // previous.classList.add('previous', 'slick-slide');
            //
            // previous_previous.setAttribute("class", "");
            //
            // previous_previous_previous.setAttribute("class", "");
            // previous_previous_previous.classList.add('previous-previous-previous', 'slick-slide');
            //
            // next.setAttribute("class", "");
            // next.classList.add('next', 'slick-slide');
            //
            // next_next.setAttribute("class", "");
            // next_next.classList.add('next-next', 'slick-slide');
            //
            // next_next_next.setAttribute("class", "");
            // next_next_next.classList.add('next-next-next', 'slick-slide');
        }, 100);
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

    const renderGalleryItems = () => {
        return templates.keys().map((elem: number, i: number) => (
            <SwiperSlide key={i} virtualIndex={i}>
                <div className="imageContainer">
                    <div className="extraWrapper">
                        <img
                            className="picture"
                            key={elem}
                            src={templates(elem).default}
                            alt={`${TEXT[i].title} Саша Стюхин Пейзажист`}
                        />
                        <div className="pictureBorder" />
                    </div>
                </div>

                {!open && (
                    <div className="textBlock">
                        <div className="title">{TEXT[i].title}</div>
                        <div className="location">{TEXT[i].location}</div>
                    </div>
                )}
            </SwiperSlide>
        ));
    };

    return (
        <>
            <div className={classNames('gallerySlider', open && 'blurred')}>
                <div className="pictureBg" />
                <div className="pictureBorderFrame" />

                <Swiper
                    onInit={() => runInit()}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    allowTouchMove={true}
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
                    pagination={{
                        clickable: true,
                    }}
                    slideToClickedSlide={true}
                    // включаю свайп на мобильных
                    breakpoints={{
                        '598': {
                            allowTouchMove: false,
                        },
                    }}
                >
                    {renderGalleryItems()}
                </Swiper>

                {!open && (
                    <input
                        onChange={(e) => swiper.slideTo(Number(e.target.value), based_animation_transition)}
                        value={slideIndex}
                        type="range"
                        min={0}
                        max={amount_of_pictures}
                        style={{ width: `${input_width}px` }}
                    />
                )}
            </div>
            <Modal
                parentClass="gallerySlider"
                slideIndex={slideIndex}
                templates={templates}
                open={modalOpened}
                setOpen={showModal}
            />
        </>
    );
});

export { GallerySlider };
