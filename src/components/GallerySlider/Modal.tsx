import * as React from 'react';
import { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';
import { ReactComponent as CloseButton } from '../../styles/images/modal_icons/close.svg';
import { ReactComponent as BuyButton } from '../../styles/images/modal_icons/buy.svg';
import { ReactComponent as VerticalButton } from '../../styles/images/modal_icons/vertical.svg';
import { ReactComponent as HorizontalButton } from '../../styles/images/modal_icons/horizontal.svg';
import { ReactComponent as ZoomButton } from '../../styles/images/modal_icons/zoom.svg';
import * as TEXT from "../../nature.json";

type IModalProps = {
    parentClass: string;
    slideIndex: number;
    open: boolean;
    setOpen: (v: boolean) => void;
    templates: { (arg0: number): { (): any; new (): any; default: string | undefined }; keys: () => number[] };
};

const Modal = React.forwardRef<HTMLDivElement, IModalProps>(function MenuPopup(props, ref) {
    const { parentClass, slideIndex, setOpen, open, templates, ...rest } = props;

    const blockClass = cn('modal');
    const rootClass = cn(parentClass as string);
    const button_class = cn("modal_button");
    const image_class = cn("modal_picture");

    const current_item = slideIndex;
    const current_image = templates(templates.keys()[current_item]).default;
    const name_of_pic = `./${current_item + 1}.jpg`;
    //проверяем, что у фотографии есть горизональное отображение
    const horizontal = require.context('../../styles/images/nature/horizontal/', true, /\.(jpg|jpeg)$/) as any;
    const has_horizontal = horizontal.keys().includes(name_of_pic);
    let horizontal_image;
    has_horizontal ? horizontal_image =
        <img className={image_class(null, ['hidden'])} id="horizontal" src={`${horizontal(name_of_pic).default}`} alt=""/>
        : undefined;
    //проверяем, что есть зум, хотя он должен быть всегда
    const zoomed = require.context('../../styles/images/nature/zoomed/', true, /\.(jpg|jpeg)$/) as any;
    const has_zoom = zoomed.keys().includes(name_of_pic);
    let zoomed_image;
    has_zoom ? zoomed_image =
            <img className={image_class(null, ['hidden'])} id="zoomed" src={`${zoomed(name_of_pic).default}`} alt=""/>
        : undefined;

    const vertical_picture = document.getElementById('vertical') as HTMLImageElement;
    const horizontal_picture = document.getElementById('horizontal') as HTMLImageElement;
    const zoomed_picture = document.getElementById('zoomed') as HTMLImageElement;

    const showHorizontal = () => {
        horizontal_picture.classList.remove('hidden');
        vertical_picture.classList.add('hidden');
        zoomed_picture.classList.add('hidden');
    };

    const showVertical = () => {
        vertical_picture.classList.remove('hidden');
        horizontal_picture.classList.add('hidden');
        zoomed_picture.classList.add('hidden');
    };

    const showZoomed = () => {
        vertical_picture.classList.add('hidden');
        horizontal_picture.classList.add('hidden');
        zoomed_picture.classList.remove('hidden');
    };

    useEffect(() => {
        const close = (e: { keyCode: number; }) => {
            if(e.keyCode === 27){
                setOpen(!open);
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[setOpen, open])

    return (
        <div {...rest} className={classNames(rootClass(blockClass()), blockClass(), open && 'open')} ref={ref}>
            <div className="imageContainer">
                <img className={image_class()} id="vertical" src={current_image} alt={`${TEXT[0].title} Саша Стюхин Пейзажист`} />
                {has_horizontal && horizontal_image}
                {has_zoom && zoomed_image}
            </div>

            <div className="buttons">
                <div className="action_buttons">
                    <button className={button_class({type: "close"})} onClick={() => setOpen(!open)}>
                        <CloseButton />
                    </button>
                    <button
                        className={button_class({type: "buy"})}
                        // onClick={openBuyMenu}
                    >
                        <BuyButton />
                    </button>
                </div>
                <div className="resize_buttons">
                    <button className={button_class({type: "vertical"})} onClick={showVertical}>
                        <VerticalButton />
                    </button>
                    {has_horizontal && (
                        <button className={button_class({type: "horizontal"})} onClick={showHorizontal}>
                            <HorizontalButton />
                        </button>
                    )}
                    {has_zoom && (
                        <button className={button_class({type: "zoom"})} onClick={showZoomed}>
                            <ZoomButton />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});

export { Modal };
