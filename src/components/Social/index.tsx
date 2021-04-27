import * as React from "react";
import {cn} from "@bem-react/classname";
import classNames from "classnames";

type Props = {
    parentClass: string;
};

const Social: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    const blockClass = 'social';
    const rootClass = cn(parentClass!);
    const itemClass = cn(blockClass);

    return (
        <div className={rootClass(blockClass, [itemClass('container')])}>
            <ul className={itemClass('list')}>
                <li className={classNames(itemClass('item', {type: 'tg'}), 'link')}>
                    <a href="#">Телеграм</a>
                </li>
                <li className={classNames(itemClass('item', {type: 'bm'}), 'link')}>
                    <a href="#">Фейсбук</a>
                </li>
                <li className={classNames(itemClass('item', {type: 'inst'}), 'link')}>
                    <a href="https://instagram.com/stukhin">Инстаграм</a>
                </li>
            </ul>
        </div>
    )
};

export { Social };
