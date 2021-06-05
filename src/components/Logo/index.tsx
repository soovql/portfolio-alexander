import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import classNames from "classnames";
import { ReactComponent as LogoImage } from '../../styles/images/logo.svg';
import { ReactComponent as LogoImageMobile } from '../../styles/images/logo_sm.svg';

type Props = {
  parentClass: string;
  noClick?: boolean;
  color?: string;
  isHidden?: boolean;
};

const Logo: React.FC<Props> = (props) => {
  const { parentClass, noClick, color, isHidden } = props;

  const rootClass = cn(parentClass as string);
  const blockClass = 'logo';
  const logoClass = classNames(rootClass(blockClass), cn(blockClass)({isHidden}), noClick && 'noclick');
  const logo = <LogoImage fill={color || '#fff'}/>;
  const logoMobile =  <LogoImageMobile fill={color || '#fff'}/>;

  return (
    <NavLink to="/" className={logoClass} title="Вернуться на главную страницу">
      { (window.innerWidth < 392) ? logoMobile : logo }
    </NavLink>
  );
};

export { Logo };
