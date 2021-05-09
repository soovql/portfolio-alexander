import * as React from 'react';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';

type Props = {
  parentClass?: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  color?: string;
  barColor?: string;
};

const Burger = React.forwardRef<HTMLDivElement, Props>(function Burger(
  props,
  ref
) {
  const { parentClass, open, setOpen, color, barColor, ...rest } = props;

  const rootClass = cn(parentClass as string);
  const blockClass = cn('burger');

  return (
    <div
      {...rest}
      style={{ backgroundColor: color || '#E5EDEF' }}
      className={classNames(
        rootClass(blockClass()),
        blockClass(),
        'link',
        open && 'open'
      )}
      aria-label="Открыть меню"
      ref={ref}
      onClick={() => setOpen(!open)}
    >
      <div className={blockClass('barContainer')}>
        <div
            className={blockClass('bar')}
            style={{ backgroundColor: barColor || '#FFFFFF' }}
        />
        <div
            className={blockClass('bar')}
            style={{ backgroundColor: barColor || '#FFFFFF' }}
        />
      </div>
    </div>
  );
});

export { Burger };
