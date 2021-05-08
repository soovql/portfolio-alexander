import * as React from 'react';
import { useState } from 'react';
import { Social } from '../../components/Social';
import { Menu } from '../../components/Menu';
import { Burger } from '../../components/Burger';
import { MenuPopup } from '../../components/MenuPopup';
import { Logo } from '../../components/Logo';
import { MainPageLogoColors, MainPageBurgerColors, MainPageBurgerLineColors } from '../../logoColors';
import { Slider } from '../../components/Slider';
import {Cursor} from "../../components/Cursor";

const MainPage: React.FC = (props) => {
  const blockClass = 'mainPage';
  const [open, setOpen] = useState(false);
  const [color, changeColor] = useState(0);

  return (
    <div className={blockClass}>
        <Cursor />
        <Logo
            parentClass={blockClass}
            //disabling logo click on main page
            noClick={true}
            color={MainPageLogoColors[color] || '#fff'}
            isHidden={open}
        />
        <Slider changeColor={changeColor} open={open} />
        {/*desktop display*/}
        <Menu parentClass={blockClass} />
        <Social parentClass={blockClass} />
        {/*mobile display*/}
        <Burger
            parentClass={blockClass}
            open={open}
            setOpen={setOpen}
            color={MainPageBurgerColors[color]}
            barColor={MainPageBurgerLineColors[color]}
        />
        <MenuPopup parentClass={blockClass} open={open} />
    </div>
  );
};

export { MainPage };
