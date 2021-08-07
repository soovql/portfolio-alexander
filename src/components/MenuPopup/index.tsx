import * as React from 'react';
import { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';
import { Social } from '../Social';
import { Menu } from '../Menu';

type IMenuPopupProps = {
    parentClass: string;
    open: boolean;
};

const MenuPopup = React.forwardRef<HTMLDivElement, IMenuPopupProps>(function MenuPopup(props, ref) {
    const { parentClass, open, ...rest } = props;

    const blockClass = cn('menuPopup');
    const rootClass = cn(parentClass as string);

    // for animation on load
    useEffect(() => {
        const modal = document.getElementsByClassName('menuPopup')[0] as HTMLElement;
        modal.classList.add('animating');
        if (open) {
            setTimeout(() => {
                modal.classList.remove('animating');
                modal.classList.add('animated');
                return () => modal.classList.remove('animated');
            }, 1000);
        }
        return;
    }, [open]);

    return (
        <div {...rest} className={classNames(rootClass(blockClass()), blockClass(), open && 'open')} ref={ref}>
            <div className={blockClass('contentWrapper')}>
                <Menu parentClass={blockClass()} auxClass={blockClass()} type="column"/>
                <div className={blockClass('bottomWrapper')}>
                    <Social parentClass={blockClass()} />
                    <div className={blockClass('text')}>Фотограф Саша Стюхин</div>
                    <div className={blockClass('text')}>Все права защищены © {new Date().getFullYear()}</div>
                </div>
            </div>
        </div>
    );
});

export { MenuPopup };
