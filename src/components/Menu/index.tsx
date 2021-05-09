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
    <nav className={classNames(rootClass(blockClass), cn(blockClass)({type: type}))}>
      <ul>
        <li>
          <NavLink className={linkClass({ type: auxClass })} to="/nature">
            пейзажи
            <div className="underline"/>
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass({ type: auxClass })} to="/city">
            город
            <div className="underline"/>
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass({ type: auxClass })} to="/order">
            ещё
            <div className="underline"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export { Menu };
