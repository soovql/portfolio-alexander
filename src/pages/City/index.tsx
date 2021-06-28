import * as React from 'react';
import {useState} from 'react';
import {Logo} from '../../components/Logo';
import {Burger} from '../../components/Burger';
import {MenuPopup} from '../../components/MenuPopup';
import {Cursor} from '../../components/Cursor';
import {GallerySlider} from "../../components/GallerySlider";
import {GalleryTypes} from '../../GalleryTypes';

type Props = {
    parentClass?: string;
};

const City: React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);

    const blockClass = 'city';

    const templates = require.context('../../styles/images/city/gallery/', true, /\.(jpg|jpeg)$/) as any;

    return (
        <div className={blockClass}>
            <Cursor activeItem={activeItem} />
            <Logo parentClass={blockClass} isHidden={open} color="#000"/>
            <Burger parentClass={blockClass} open={open} setOpen={setOpen} barColor="#000000" color="rgba(255, 255, 255, 0.15)"/>
            <MenuPopup parentClass={blockClass} open={open} />
            <GallerySlider templates={templates} open={open} setActive={setActiveItem} type={GalleryTypes.City}/>
        </div>
    );
};

export { City };
