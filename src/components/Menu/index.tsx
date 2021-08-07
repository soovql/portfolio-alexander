import * as React from 'react';
import { useLocation } from "react-router-dom";
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

    const { pathname } = useLocation();

    return (
        <nav className={classNames(rootClass(blockClass), cn(blockClass)({ type: type }))}>
            <ul>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to={{
                            pathname: "/nature",
                            state: { from: pathname }
                        }}
                        aria-label="Перейти на страницу Пейзажи"
                    >
                        пейзажи
                        <div className="underline" />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to={{
                            pathname: "/city",
                            state: { from: pathname }
                        }}
                        aria-label="Перейти на страницу Город"
                    >
                        город
                        <div className="underline" />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to={{
                            pathname: "/order",
                            state: { from: pathname }
                        }}
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
