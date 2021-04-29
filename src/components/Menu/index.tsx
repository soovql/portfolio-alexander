import * as React from "react";
import {NavLink} from "react-router-dom";
import {cn} from "@bem-react/classname";

type Props = {
    parentClass?: string;
    auxClass?: string;
};

const Menu: React.FC<Props> = (props) => {
    const {
        parentClass,
        auxClass,
    } = props;

    const rootClass = cn(parentClass!);
    const blockClass = 'menu';
    const linkClass = cn('link');

    return (
        <nav className={rootClass(blockClass, [blockClass])}>
            <ul>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/nature"
                    >
                        пейзажи
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/city"
                    >
                        город
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={linkClass({ type: auxClass })}
                        to="/order"
                    >
                        ещё
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export { Menu };
