import * as React from 'react';
import {useEffect, useState} from "react";
import { cn } from '@bem-react/classname';
import Slick, { Settings } from 'react-slick';

type ISliderProps = {
  parentClass?: string;
  zoomed?: boolean;
  changeColor: (v: number) => void;
  open: boolean;
};

const Slider = React.forwardRef<HTMLDivElement, ISliderProps>(function Slider(
  props,
  ref
) {
  const { changeColor, open, zoomed, ...rest } = props;
  const [isZoomed, setZoomed] = useState(zoomed);


  useEffect(() => {
    setTimeout(()=>{
      const active_slide = document.getElementsByClassName('slick-current')[0] as HTMLElement;
      active_slide.classList.add('zoomed');
    }, 1000)

  }, [isZoomed])

  const templates = require.context('../../styles/images/gallery/', true, /\.(jpg|jpeg)$/);

  const slickSettings: Settings = {
    lazyLoad: 'ondemand',
    accessibility: true,
    draggable: false,
    dots: !open,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: !open,
    swipeToSlide: true,
    beforeChange: (index: number, next: number) => {
      changeColor(next);
      setZoomed(!isZoomed);
    },
    nextArrow: <Arrow direction={'right'} auxClass={open ? 'open' : 'closed'}/>,
    prevArrow: <Arrow direction={'left'} auxClass={open ? 'open' : 'closed'}/>,
    appendDots: function customDots(dots) {
      return (
        <ul style={{ margin: "0px" }}> {dots} </ul>
      );
    },
    customPaging: function customPage2(i) {
      return (
          <div
              className={"customDot"}
          >
            {i + 1}
          </div>
      )
    }
  };

  const renderItems = () => {
    return  templates.keys().map((elem, i) => (
        <div key={i}>
          <img className="slider-image" key={elem} src={templates(elem).default} alt="Саша Стюхин Пейзажист" />
        </div>
    ))
  };

  return (
    <div {...rest} className={'slider'} ref={ref}>
      <Slick {...slickSettings}>{renderItems()}</Slick>
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
  const arrowClass = blockClass({ direction: direction, state: auxClass }, );

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
