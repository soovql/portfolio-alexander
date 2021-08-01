import React, {useEffect, useState} from "react";
import { cn } from '@bem-react/classname';
import * as TEXT from "../../../nature.json";

type SizeProps = {
    parentClass: string;
    current_item: number;
    setUserSize: (v: number) => void;
};

const Size: React.FC<SizeProps> = (props) => {
    const { parentClass, current_item, setUserSize } = props;

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setUserSize(activeIndex);
    }, [activeIndex]);

    const pickActive = (index: React.SetStateAction<number>) => {
        setActiveIndex(index);
    }

    const blockClass = cn(parentClass);

    const prices = TEXT[current_item] ? TEXT[current_item].prices : TEXT[0].prices;

    const getPrices = () => {

        return prices.map(({size, price}, index) => (
            <div
                key={index}
                className={
                    blockClass('priceList-item', ['modal_button', activeIndex === index ? "active" : undefined])
                }
                onClick={() => pickActive(index)}
            >
                <div className={blockClass('priceList-itemSize')}>
                    {size}
                </div>
                <div className={blockClass('priceList-itemPrice')}>
                    {price}
                </div>
            </div>
        ));
    };


    return (
        <div className={blockClass("priceList")}>
        {getPrices()}
    </div>
    );
}

export {Size};
