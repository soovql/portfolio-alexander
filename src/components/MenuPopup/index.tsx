import * as React from "react";
import { cn } from '@bem-react/classname'
import classNames from "classnames";
import {Social} from "../Social";
import {Menu} from "../Menu";

type Props = {
    parentClass: string;
    open: boolean;
    setOpen: (v: boolean) => void;
};

const MenuPopup = React.forwardRef<HTMLDivElement, Props>(function MenuPopup(props, ref) {

    const {
        parentClass,
        open,
        setOpen,
        ...rest
    } = props;

    const blockClass = cn('menuPopup');
    const rootClass = cn(parentClass!);

    return (
        <div
            {...rest}
            className={classNames(rootClass(blockClass()), blockClass(), open && 'open')}
            ref={ref}
        >
            <Menu parentClass={blockClass()}/>
            <Social parentClass={blockClass()}/>
            <div className={blockClass('text')}>
                Фотограф Саша Стюхин <br/>
                Все права защищены © {new Date().getFullYear()}
            </div>
        </div>
    )
});

export { MenuPopup };
