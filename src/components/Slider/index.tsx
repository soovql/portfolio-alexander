import * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import Slick, { Settings } from 'react-slick';
import classNames from 'classnames';

type ISliderProps = {
    zoomed?: boolean;
    changeColor: (v: number) => void;
    open: boolean;
};

const Slider = React.forwardRef<HTMLDivElement, ISliderProps>(function Slider(props, ref) {
    const { changeColor, open, zoomed, ...rest } = props;

    const blockClass = cn('slider');

    const [isZoomed, setZoomed] = useState(zoomed);

    useEffect(() => {
        setTimeout(() => {
            const active_slide = document.getElementsByClassName('slick-current')[0] as HTMLElement;
            const active_dot = document.getElementsByClassName('slick-active')[1] as HTMLElement;
            active_slide.classList.add('zoomed');
            active_dot.classList.add('current');
        }, 100);
    }, [isZoomed]);

    let templates: any;
    if (window.innerWidth < 599) {
        templates = require.context('../../gallery/main_page/mobile/', true, /\.(jpg|jpeg)$/);
    } else {
        templates = require.context('../../gallery/main_page/desktop/', true, /\.(jpg|jpeg)$/);
    }

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
        autoplay: !open,
        swipe: true,
        beforeChange: (index: number, next: number) => {
            changeColor(next);
            setZoomed(!isZoomed);
        },
        nextArrow: <Arrow direction={'right'} auxClass={open ? 'open' : 'closed'} />,
        prevArrow: <Arrow direction={'left'} auxClass={open ? 'open' : 'closed'} />,
        appendDots: function customDots(dots) {
            return <ul style={{ margin: '0px', opacity: open ? '0' : '1' }}> {dots} </ul>;
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
        // stops autoplay on mobile swipe
        responsive: [
            {
                breakpoint: 599,
                settings: {
                    pauseOnFocus: true,
                },
            },
        ],
    };

    const renderItems = () => {
        return templates.keys().map((elem: number, i: number) => (
            <div key={i} className="slider-image-container">
                <img
                    className="slider-image"
                    key={elem}
                    src={templates(elem).default}
                    height={window.innerHeight}
                    alt="???????? ???????????? ??????????????????"
                />
            </div>
        ));
    };

    return (
        <div {...rest} className={classNames('slider', open && 'blurred')} ref={ref}>
            <Slick {...slickSettings}>
                {renderItems()}
            </Slick>
        </div>
    );
});

type IArrowProps = {
    parentClass?: string;
    auxClass?: string;
    direction: string;
    onClick?(event: React.MouseEvent): void;
};

const Arrow: React.FC<IArrowProps> = (props) => {
    const { direction, onClick, auxClass } = props;

    const blockClass = cn('arrow');
    const arrowClass = blockClass({ direction: direction, state: auxClass });

    return (
        <div
            className={arrowClass}
            onClick={onClick}
            aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
            role="button"
        />
    );
};

export { Slider };
