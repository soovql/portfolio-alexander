import * as React from "react";
import {useState} from "react";
import {Social} from "../../components/Social";
import {Menu} from "../../components/Menu";
import {Burger} from "../../components/Burger";
import {MenuPopup} from "../../components/MenuPopup";
import {Logo} from "../../components/Logo";
import image from '../../styles/images/gallery/1.jpg'


const MainPage: React.FC = (props) => {
    const blockClass = "mainPage";
    const [open, setOpen] = useState(false);

    return (
        <div
            className={blockClass}
            style={{
                backgroundImage: `url(${image})`
            }}
        >
            {!open && <Logo parentClass={blockClass}/>}
            {/*desktop display*/}
            <Menu parentClass={blockClass}/>
            <Social parentClass={blockClass}/>
            {/*mobile display*/}
            <Burger parentClass={blockClass} open={open} setOpen={setOpen}/>
            <MenuPopup parentClass={blockClass} open={open} setOpen={setOpen}/>
        </div>
    )
};

export { MainPage };
