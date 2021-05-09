import * as React from 'react';
import Slick, { Settings } from 'react-slick';
import classNames from "classnames";

type IGallerySliderProps = {
    parentClass?: string;
};

const GallerySlider = React.forwardRef<HTMLDivElement, IGallerySliderProps>(function Slider(
    props,
    ref
) {
    const { parentClass } = props;

    let templates: any;
    if (window.innerWidth < 599) {
        templates = require.context('../../styles/images/gallery/mobile/', true, /\.(jpg|jpeg)$/);
    } else {
        templates = require.context('../../styles/images/gallery/desktop/', true, /\.(jpg|jpeg)$/);
    }

    const slickSettings: Settings = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 7000,
        responsive: [
            {
                breakpoint: 599,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 393,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    const renderItems = () => {
        return  templates.keys().map((elem: number, i: number) => (
            <div key={i} className="slider-image-container">
                <img className="picture" key={elem} src={templates(elem).default} height={window.innerHeight} alt="Саша Стюхин Пейзажист" />
            </div>
        ))
    };

    return (
        <div className={classNames('slider')} ref={ref}>
            <Slick {...slickSettings}>{renderItems()}</Slick>
        </div>
    );
});


export { GallerySlider };
