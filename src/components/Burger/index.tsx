import * as React from "react";
import {cn} from "@bem-react/classname";
import classNames from "classnames";


type Props = {
    parentClass?: string;
    open: boolean;
    setOpen: (v: boolean) => void;
};

const Burger = React.forwardRef<HTMLDivElement, Props>(function Burger(props, ref) {
    const {
        parentClass,
        open,
        setOpen,
        ...rest
    } = props;

    const rootClass = cn(parentClass!);
    const blockClass = cn('burger');

    return (
        <div
            {...rest}
            className={classNames(rootClass(blockClass()), blockClass(), 'link', open && 'open')}
            aria-label="Открыть меню"
            ref={ref}
            onClick={() => setOpen(!open)}
        >
            <div className={blockClass('barContainer')}>
                <div className={blockClass('bar')}></div>
                <div className={blockClass('bar')}></div>
            </div>
        </div>
    )
});

export { Burger };
