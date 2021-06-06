import * as React from 'react';
import { cn } from '@bem-react/classname';

type Props = {
    auxClass?: string;
    url: string;
    text: string;
};

const OrderLink: React.FC<Props> = (props) => {
    const { auxClass, url, text } = props;

    const blockClass = 'orderLink';

    return (
        <div className={cn(blockClass)({ type: auxClass })}>
            <a href={url}>{text}</a>
        </div>
    );
};

export { OrderLink };
