import * as React from 'react';
import { cn } from '@bem-react/classname';
import { OrderLink } from '../OrderLink';

type Props = {
    parentClass?: string;
    auxClass?: string;
    type?: string;
};

const OrderMenu: React.FC<Props> = (props) => {
    const { parentClass, auxClass } = props;

    const blockClass = 'orderMenu';
    const rootClass = cn(parentClass as string);

    return (
        <nav className={rootClass(blockClass, [blockClass, auxClass])}>
            <ul>
                <li>
                    <OrderLink text="принты" url={'#prints'} />
                </li>
                <li>
                    <OrderLink text="съемки" url={'#shoots'} />
                </li>
                <li>
                    <OrderLink text="фототуры" url={'#tours'} />
                </li>
                <li>
                    <OrderLink text="ещё" url={'#more'} />
                </li>
            </ul>
        </nav>
    );
};

export { OrderMenu };
