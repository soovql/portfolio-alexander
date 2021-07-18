import * as React from 'react';
import { Logo } from '../../components/Logo';
import { useState} from 'react';
import { Burger } from '../../components/Burger';
import { MenuPopup } from '../../components/MenuPopup';
import { Cursor } from '../../components/Cursor';
import { GallerySlider } from '../../components/GallerySlider';
import { GalleryTypes } from '../../GalleryTypes';

const Nature: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);

    const blockClass = 'nature';

    const templates = require.context('../../gallery/nature/vertical/', true, /\.(jpg|jpeg)$/) as any;

    return (
        <div className={blockClass}>
            <Cursor activeItem={activeItem}/>
            <Logo parentClass={blockClass} isHidden={open} />
            <Burger parentClass={blockClass} open={open} setOpen={setOpen} color="#3C3C3C" />
            <MenuPopup parentClass={blockClass} open={open} />
            <GallerySlider templates={templates} open={open} setActive={setActiveItem} type={GalleryTypes.Nature}/>
        </div>
    );
};

export { Nature };
