import * as React from 'react';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';

type SocialProps = {
  parentClass: string;
};

type LinkProps = {
  parentClass: string;
  type: string;
  url: string;
  alt?: string;
};

const Social: React.FC<SocialProps> = (props) => {
  const { parentClass } = props;

  const blockClass = 'social';
  const rootClass = cn(parentClass);

  return (
    <div className={rootClass(blockClass, [cn('social')()])}>
      <ul className={cn('social')('list')}>
        <SocialLink
            parentClass={blockClass}
            url="#"
            alt="ggg"
            type="tg"
        />
        <SocialLink
            parentClass={blockClass}
            url="#"
            alt="ggg"
            type="bm"
        />
        <SocialLink
          parentClass={blockClass}
          url="https://instagram.com/stukhin"
          alt="Инстаграм"
          type="inst"
        />
      </ul>
    </div>
  );
};

const SocialLink: React.FC<LinkProps> = (props) => {
  const { parentClass, type, url, alt } = props;

  const itemClass = cn(parentClass);

  return (
    <li className={classNames(itemClass('item', { type }))}>
      <a href={url} className="link">
        {alt}
        <div className="underline"/>
      </a>
    </li>
  );
};

export { Social };
