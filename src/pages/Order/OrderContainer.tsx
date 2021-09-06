import * as React from 'react';
import { cn } from '@bem-react/classname';
import { OrderLink } from "../../components/OrderLink";
import ScrollAnimation from 'react-animate-on-scroll';

type Props = {
    parentClass: string;
    id: string;
    text: string | string[];
    linkText: string;
    auxClass?: string;
    children?: React.ReactNode;
};

const OrderContainer: React.FC<Props> = (props) => {
    const { parentClass, id, text, linkText, auxClass, children } = props;

    const rootClass = cn(parentClass as string);

    return (
        <section className={rootClass('sectionWrapper', [auxClass])}
            id={id}
        >
            {children}
            <div
                className={rootClass('textContainer')}
            >
                <ScrollAnimation
                    animateIn="slideInDown"
                >
                    <div className={rootClass('textContainerWrapper')}>
                        {typeof props.text === "string" ?
                            <div className={rootClass('text')} dangerouslySetInnerHTML={{__html: text as string}} />
                            :
                            typeof text !== "string" && text?.map((item, key) => {
                            return  <div className={rootClass('text')}  key={key} dangerouslySetInnerHTML={{__html: item}} />
                        })}
                        <OrderLink text={linkText} url={'#'} auxClass="small" />
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export { OrderContainer };
