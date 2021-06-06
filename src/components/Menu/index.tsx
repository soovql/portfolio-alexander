import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';

type Props = {
    parentClass?: string;
    auxClass?: string;
    type?: string;
};

const Menu: React.FC<Props> = (props) => {
    const { parentClass, auxClass, type } = props;

    const blockClass = 'menu';
    const rootClass = cn(parentClass as string);
    const linkClass = cn('link');

    return (
        <nav className={classNames(rootClass(blockClass), cn(blockClass)({ type: type }))}>
            <ul>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/nature"
                        aria-label="Перейти на страницу Пейзажи"
                    >
                        пейзажи
                        <div className="underline" />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/city"
                        aria-label="Перейти на страницу Город"
                    >
                        город
                        <div className="underline" />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/order"
                        aria-label="Перейти на страницу Заказы"
                    >
                        ещё
                        <div className="underline" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export { Menu };
