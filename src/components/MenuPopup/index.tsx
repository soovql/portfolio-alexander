import * as React from "react";
import { cn } from '@bem-react/classname'
import classNames from "classnames";
import {Social} from "../Social";
import {Menu} from "../Menu";

type IMenuPopupProps = {
    parentClass: string;
    open: boolean;
    setOpen: (v: boolean) => void;
};

const MenuPopup = React.forwardRef<HTMLDivElement, IMenuPopupProps>(function MenuPopup(props, ref) {

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
            <Menu
                parentClass={blockClass()}
                auxClass={blockClass()}
            />
            <div className={blockClass('bottomWrapper')}>
                <Social parentClass={blockClass()}/>
                <div className={blockClass('text')}>
                    Фотограф Саша Стюхин 
                </div>
                <div className={blockClass('text')}>
                    Все права защищены © {new Date().getFullYear()}
                </div>
            </div>

        </div>
    )
});

export { MenuPopup };
