import * as React from "react";
import {NavLink} from "react-router-dom";
import {cn} from "@bem-react/classname";

type Props = {
    parentClass?: string;
};

const Menu: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    const rootClass = cn(parentClass!);
    const blockClass = 'menu';

    return (
        <nav className={rootClass(blockClass, [blockClass])}>
            <ul>
                <li>
                    <NavLink className="link" to="/nature">пейзажи</NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/city">город</NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/order">ещё</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export { Menu };
