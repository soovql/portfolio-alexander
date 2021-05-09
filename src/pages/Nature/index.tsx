import * as React from 'react';
import { Logo } from '../../components/Logo';
import {useState} from "react";
import {Burger} from "../../components/Burger";
import {MenuPopup} from "../../components/MenuPopup";
import {Cursor} from "../../components/Cursor";
import {GallerySlider} from "../../components/GallerySlider";


const Nature: React.FC = (props) => {
  const [open, setOpen] = useState(false);

  const blockClass = 'nature';

  return (
    <div className={blockClass}>
        <Cursor />
        {!open && (
            <Logo
                parentClass={blockClass}
                isHidden={open}
            />
        )}
        <Burger
            parentClass={blockClass}
            open={open}
            setOpen={setOpen}
            color="#3C3C3C"
        />
        <MenuPopup parentClass={blockClass} open={open} />
        <GallerySlider/>
    </div>
  );
};

export { Nature };
