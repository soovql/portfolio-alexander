import * as React from 'react';
import { Logo } from '../../components/Logo';
import {useState} from "react";
import {Burger} from "../../components/Burger";
import {MenuPopup} from "../../components/MenuPopup";
import {Cursor} from "../../components/Cursor";


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
        <div className="picture"
             style={{height: "500px", width: "500px", backgroundColor: "black", position: "absolute", top: "300px", left: "300px"}}
        />
    </div>
  );
};

export { Nature };
