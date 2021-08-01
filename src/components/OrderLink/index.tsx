import * as React from 'react';
import { cn } from '@bem-react/classname';
import AnchorLink from 'react-anchor-link-smooth-scroll'

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
            <AnchorLink offset={() => 200} href={url}>{text}</AnchorLink>
        </div>
    );
};

export { OrderLink };
