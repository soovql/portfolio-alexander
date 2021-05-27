import * as React from 'react';
import Slick, { Settings } from 'react-slick';
import classNames from "classnames";
import {useEffect, useState} from "react";
import * as TEXT from "../../nature.json";

type IGallerySliderProps = {
    templates: { (arg0: number): { (): any; new(): any; default: string | undefined; }; keys: () => number[]; };
    open: boolean;
    setActive: (v: number) => void;
};

const GallerySlider = React.forwardRef<HTMLDivElement, IGallerySliderProps>(function Slider(
    props,
    ref
) {
    const [isPrevious, setPrevious] = useState(-1);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const { templates, open, setActive, ...rest } = props;

    const amount_of_pictures = templates.keys().length - 1;

    useEffect(() => {
        const center = (document.getElementsByClassName('slick-center')[1]) as HTMLElement;
        // const previous = center.previousElementSibling as HTMLElement;
        // const previous_previous = previous.previousSibling as HTMLElement;
        // const previous_previous_previous = previous_previous.previousSibling as HTMLElement;
        // const next = center.nextElementSibling as HTMLElement;
        // const next_next = next.nextElementSibling as HTMLElement;
        // const next_next_next = next_next.nextElementSibling as HTMLElement;

        // previous.setAttribute("class", "");
        // previous.classList.add('previous', 'slick-slide');
        //
        // previous_previous.setAttribute("class", "");
        // previous_previous.classList.add('previous-previous', 'slick-slide');
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

    }, [isPrevious])

    const slickSettings: Settings = {
        className: "sliderPictures",
        accessibility: true,
        centerPadding: "0px",
        centerMode: true,
        variableWidth: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 7000,
        speed: 300,
        infinite: false,
        fade: false,
        draggable: false,
        focusOnSelect: true,
        onInit: () => {
            console.log('init');
            setPrevious(0);
            setActive(0);
        },
        beforeChange: (index: number, next: number) => {
            setPrevious(next);
            setSlideIndex(next);
        },
        afterChange(currentSlide: number) {
            console.log(currentSlide);
            setActive(currentSlide);
            setUpdateCount(updateCount + 1);
        },
        appendDots: function customDots(dots) {
            return (
                <ul className={"gallerySlider_dots"} style={{ margin: "0px", opacity: open ? '0' : '1' }}> {dots} </ul>
            );
        },
        customPaging: function addcustomPaging(i) {
            return (
                <a
                    className={"customDotWrapper"}
                >
                    <div  className={"customDot"}>
                        {i + 1}
                    </div>
                </a>
            )
        },
        responsive: [
            {
                breakpoint: 599,
                settings: {
                    slidesToShow: 1,
                    focusOnSelect: false,
                }
            }
        ]
    };

    const renderGalleryItems = () => {
        return  templates.keys().map((elem: number, i: number) => (
            <div key={i} className="slider-image-wrapper">
                <img className="picture" key={elem} src={templates(elem).default} alt={`${TEXT[i].title} Саша Стюхин Пейзажист`} />
                {!open &&
                    <div className="textBlock">
                        <div className="title">{TEXT[i].title}</div>
                        <div className="location">{TEXT[i].location}</div>
                    </div>
                }
            </div>
        ))
    };

    const slider = React.useRef<Slick>(null)

    return (
        <div className={classNames('gallerySlider', open && 'blurred')}>
            <Slick
                {...rest}
                {...slickSettings}
                ref={slider}
            >
                {renderGalleryItems()}
            </Slick>
            <input
                onChange={e => slider?.current?.slickGoTo(Number(e.target.value))}
                value={slideIndex}
                type="range"
                min={0}
                max={amount_of_pictures}
            />
        </div>
    );
});


export { GallerySlider };
