import * as React from 'react';
import { cn } from '@bem-react/classname';
import {OrderLink} from "../../components/OrderLink";

type Props = {
    parentClass: string;
    id: string;
    text: string | string[];
    linkText: string;
    children?: React.ReactNode;
};

const OrderContainer: React.FC<Props> = (props) => {
    const { parentClass, id, text, linkText, children } = props;

    const rootClass = cn(parentClass as string);

    return (
        <section className={rootClass('sectionWrapper')} id={id}>
            <div className={rootClass('imageContainer', [id])}>
                {children}
                {/*<img className={rootClass('image')} alt="Туры с пейзажистами" />*/}
            </div>
            <div className={rootClass('textContainer')}>
                {typeof props.text === "string" ?
                    <div className={rootClass('text')} dangerouslySetInnerHTML={{__html: text as string}} />
                    :
                    typeof text !== "string" && text?.map((item, key) => {
                    return  <div className={rootClass('text')}  key={key} dangerouslySetInnerHTML={{__html: item}} />
                })}
                <OrderLink text={linkText} url={'#'} auxClass="small" />
            </div>
        </section>
    );
};

export { OrderContainer };
