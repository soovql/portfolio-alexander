import * as React from 'react';
import { cn } from '@bem-react/classname';
import Slick, { Settings } from 'react-slick';

type IGalleryCommercialProps = {
    parentClass: string;
};

const GalleryCommercial: React.FC<IGalleryCommercialProps> = (props) => {
    const { parentClass } = props;

    const blockClass = cn(parentClass);

    const templates = require.context('../../styles/images/order/gallery/commercial/', true, /\.(jpg|jpeg)$/) as any;

    const slickSettings: Settings = {
        lazyLoad: 'ondemand',
        accessibility: true,
        draggable: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 7000,
        cssEase: 'linear',
        fade: true,
        autoplay: true,
        swipe: false,
        arrows: false,
        appendDots: function customDots(dots) {
            return <ul style={{ margin: '0px'}}> {dots} </ul>;
        },
        customPaging: function addcustomPaging(i) {
            return (
                <a className={blockClass('customDotWrapper')}>
                    <div className={blockClass('customDot')}>
                        <div className={blockClass('customDotValue')} />
                        {i + 1}
                    </div>
                </a>
            );
        },
    };

    const renderItems = () => {
        return templates.keys().map((elem: number, i: number) => (
            <div key={i} className="slider-image-container">
                <img
                    className="slider-image"
                    key={elem}
                    src={templates(elem).default}
                    height="317px"
                    alt="Коммерческие заказы на съемку"
                />
            </div>
        ));
    };

    return (
        <Slick {...slickSettings} className={blockClass('slider')}>
            {renderItems()}
        </Slick>
    );
};

export { GalleryCommercial };
