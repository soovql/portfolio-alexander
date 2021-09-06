import * as React from 'react';
import { cn } from '@bem-react/classname';
import ScrollAnimation from 'react-animate-on-scroll';
import { useEffect, useState } from "react";

type Props = {
    parentClass: string;
    open: boolean;
    updateState: (v: boolean) => void;
    setPics: (v: string) => void;
    data_id?: string;
    pictureSet: string[];
};

const Prints: React.FC<Props> = (props) => {
    const {
        parentClass,
        open,
        updateState,
        setPics,
        data_id,
        pictureSet,
    } = props;

    const blockClass = cn('prints');
    const rootClass = cn(parentClass);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    return (
        <div className={rootClass('prints', [blockClass()])}>
            <div
                className={blockClass('imageFront', ['image'])}
                data-id={data_id}
                onClick={
                    (e) => {
                        updateState(!openModal)
                        setPics(e.currentTarget.getAttribute('data-id') as string);
                    }
                }
            >
                <img src={pictureSet[0]} alt=""/>
            </div>
            <ScrollAnimation
                animateIn="load"
                initiallyVisible={true}
                className={blockClass('imageLeft', ['image'])}
            >
                <img src={pictureSet[1]} alt=""/>
            </ScrollAnimation>
            <ScrollAnimation
                animateIn="load"
                initiallyVisible={true}
                className={blockClass('imageRight', ['image'])}
            >
                <img src={pictureSet[2]} alt=""/>
            </ScrollAnimation>
        </div>
    );
};

export { Prints };
