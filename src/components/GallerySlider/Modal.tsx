import * as React from 'react';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import { cn } from '@bem-react/classname';
import { BuyModal } from "./BuyModal";
import { GalleryTypes } from '../../GalleryTypes';
import { ReactComponent as BuyButton } from '../../styles/images/modal_icons/buy.svg';
import { ReactComponent as VerticalButton } from '../../styles/images/modal_icons/vertical.svg';
import { ReactComponent as HorizontalButton } from '../../styles/images/modal_icons/horizontal.svg';
import { ReactComponent as ZoomButton } from '../../styles/images/modal_icons/zoom.svg';
import * as CITY_DATA from "../../city.json";
import * as NATURE_DATA from "../../nature.json";

type IModalProps = {
    parentClass: string;
    slideIndex: number;
    open: boolean;
    setOpen: (v: boolean) => void;
    templates: { (arg0: number): { (): any; new (): any; default: string | undefined }; keys: () => number[] };
    type: GalleryTypes;
};

const Modal = React.forwardRef<HTMLDivElement, IModalProps>(function Modal(props, ref) {
    const { parentClass, slideIndex, setOpen, open, templates, type, ...rest } = props;

    const blockClass = cn('modal');
    const rootClass = cn(parentClass as string);
    const button_class = cn("modal_button");
    const image_class = cn("modal_picture");

    const TEXT = (type === "City" ? CITY_DATA : NATURE_DATA);
    const gallery_type_city = type === "City";

    const [buyModalOpened, openBuyModal] = useState(false);

    const current_item = slideIndex;
    const current_image = templates(templates.keys()[current_item]).default;
    let name_of_pic;
    slideIndex < 10 ? name_of_pic = `./0${current_item + 1}.jpg` : name_of_pic = `./${current_item + 1}.jpg`;

    //проверяем, что у фотографии есть горизональное отображение
    let horizontal;
    if (gallery_type_city) {
        horizontal = require.context('../../gallery/city/horizontal/', true, /\.(jpg|jpeg)$/);
    } else {
        horizontal = require.context('../../gallery/nature/horizontal/', true, /\.(jpg|jpeg)$/);
    }
    const has_horizontal = horizontal.keys().includes(name_of_pic);
    let horizontal_image;
    has_horizontal ? horizontal_image =
        <img className={image_class(null, ['hidden'])} id="horizontal" src={`${horizontal(name_of_pic).default}`} alt=""/>
        : undefined;
    //проверяем, что есть зум, хотя он должен быть всегда
    let zoomed;
    if (gallery_type_city) {
        zoomed = require.context('../../gallery/city/zoomed/', true, /\.(jpg|jpeg)$/);
    } else {
        zoomed = require.context('../../gallery/nature/zoomed/', true, /\.(jpg|jpeg)$/);
    }
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
        has_zoom ? zoomed_picture.classList.add('hidden') : undefined;
    };

    const showVertical = () => {
        vertical_picture.classList.remove('hidden');
        has_horizontal ? horizontal_picture.classList.add('hidden') : undefined;
        has_zoom ? zoomed_picture.classList.add('hidden') : undefined;
    };

    const showZoomed = () => {
        vertical_picture.classList.add('hidden');
        has_horizontal ? horizontal_picture.classList.add('hidden') : undefined;
        zoomed_picture.classList.remove('hidden');
    };

    useEffect(() => {
        const close = (e: { keyCode: number; }) => {
            if (open) {
                if(e.keyCode === 27){
                    setOpen(!open);
                }
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[setOpen, open])

    const [isActive, setActive] = useState("vertical");

    return (
        <div {...rest} className={classNames(rootClass(blockClass()), blockClass(), open && 'open')} ref={ref}>
            <>
                {/*@todo возможно блюр удалить*/}
                <div className={blockClass('imageContainer', [buyModalOpened ? 'blur' : undefined])}>
                    <img className={image_class()} id="vertical" src={current_image} alt={`${TEXT[0].title} Саша Стюхин Пейзажист`} />
                    {has_horizontal && horizontal_image}
                    {has_zoom && zoomed_image}
                </div>

                <div className="buttons">
                    <div className="action_buttons">
                        <button
                            className={button_class({type: "close"})}
                            onClick={
                                () => {
                                    setOpen(!open);
                                    openBuyModal(!open);
                                    showVertical();
                                    setActive("vertical") // возвращаем значение по умолчанию, тк. при закртии модалки ничего не очищается
                                }
                            }
                        >
                            <div className='bar'/>
                            <div className='bar'/>
                        </button>
                        <button
                            className={button_class({type: "buy"}, [buyModalOpened ? 'hidden' : undefined])}
                            onClick={() => openBuyModal(true)}
                        >
                            <BuyButton />
                        </button>
                    </div>

                    <div className={
                        blockClass(
                            'resize_buttons',
                            [buyModalOpened ? 'hidden' : undefined])
                    }>
                        <button
                            className={
                                button_class(
                                    {type: "vertical"},
                                    [isActive === "vertical" ? 'active' : undefined]
                                )
                            }
                            onClick={() => {
                                showVertical()
                                setActive("vertical")
                            }}
                        >
                            <VerticalButton />
                        </button>
                        {has_horizontal && (
                            <button
                                className={
                                    button_class(
                                        {type: "horizontal"},
                                        [isActive == "horizontal" ? 'active' : undefined]
                                    )
                                }
                                onClick={() => {
                                    showHorizontal()
                                    setActive("horizontal")
                                }}
                            >
                                <HorizontalButton />
                            </button>
                        )}
                        {has_zoom && (
                            <button
                                className={
                                    button_class(
                                        {type: "zoom"},
                                        [isActive == "zoomed" ? 'active' : undefined]
                                    )
                                }
                                onClick={() => {
                                    showZoomed()
                                    setActive("zoomed")
                                }}
                            >
                                <ZoomButton />
                            </button>
                        )}
                    </div>

                </div>
            </>
            <BuyModal open_buy={buyModalOpened} current_item={current_item} setOpen={openBuyModal} type={type}/>
        </div>
    );
});

export { Modal };
