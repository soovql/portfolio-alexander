import * as React from 'react';
import { cn } from '@bem-react/classname';

type ToursItemProps = {
    title?:string;
    subtitle?:string;
    parentClass?:string;
}

type Props = {
    items:ToursItemProps[];
};

const Tours: React.FC<Props> = (props) => {
    const { items } = props;
    const blockClass = cn('tours');

    return (
        <div className={blockClass()}>
            {items.map((item: ToursItemProps, index: React.Key | null | undefined) => (
                <div key={index}>
                    {item.title && <div>title</div>}
                    {item.subtitle && <div>subtitle</div>}
                </div>
            ))}
        </div>
    );
};

export { Tours };
