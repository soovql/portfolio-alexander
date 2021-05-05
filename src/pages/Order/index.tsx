import * as React from 'react';
import { Logo } from '../../components/Logo';
import {useState} from "react";
import {Burger} from "../../components/Burger";
import {MenuPopup} from "../../components/MenuPopup";

type Props = {
  parentClass?: string;
};

const Order: React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);

    const blockClass = 'order';

    return (
        <div className={blockClass}>
            <Logo
                parentClass={blockClass}
                isHidden={open}
            />
            <Burger
                parentClass={blockClass}
                open={open}
                setOpen={setOpen}
            />
            <MenuPopup parentClass={blockClass} open={open} />
        </div>
    );
};

export { Order };
