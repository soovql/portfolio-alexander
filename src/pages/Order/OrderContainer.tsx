import * as React from 'react';
import { cn } from '@bem-react/classname';
import {OrderLink} from "../../components/OrderLink";
import { useScrollPercentage } from 'react-scroll-percentage'

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


    const [ref, percentage] = useScrollPercentage({
        threshold: 0,
    })

    // can't calculate properly :(
    function newPercentageText() {
        if (percentage === 0) {
            return 7;
        } else if (percentage <= 0.1) {
            return 5;
        }
        else if (percentage <= 0.2) {
            return 3;
        }
        else if (percentage <= 0.3) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <section className={rootClass('sectionWrapper', [auxClass])}
            id={id}
        >
            <div
                className={rootClass('imageContainer', [id])}
            >
                {children}
            </div>
            <div
                className={rootClass('textContainer')}
                ref={ref}
                style={{transform: `${
                    "rotate(" + newPercentageText() + "deg)"}`
                }}
            >
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
