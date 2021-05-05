import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { ReactComponent as LogoImage } from '../../styles/images/logo.svg';
import classNames from "classnames";

type Props = {
  parentClass?: string;
  color?: string;
  isHidden?: boolean;
};

const Logo: React.FC<Props> = (props) => {
  const { parentClass, color, isHidden } = props;

  const rootClass = cn(parentClass as string);
  const blockClass = 'logo';
  const logoClass = classNames(rootClass(blockClass), cn(blockClass)({isHidden: isHidden}));

  return (
    <NavLink to="/" className={logoClass}>
      <LogoImage fill={color || '#fff'} />
    </NavLink>
  );
};

export { Logo };
