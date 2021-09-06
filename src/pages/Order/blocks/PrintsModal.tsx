import * as React from 'react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '@bem-react/classname';
import { PICTURE_SETS } from '../blocks';

type IPrintsModal = {
    parentClass: string;
    open: boolean;
    updateState: (v: boolean) => void;
    pictures: string;
};

const PrintsModal = React.forwardRef<HTMLDivElement, IPrintsModal>(function PrintsModal(props, ref) {
    const {
        parentClass,
        open,
        updateState,
        pictures,
        ...rest
    } = props;

    const blockClass = cn('modal');
    const rootClass = cn(parentClass as string);
    const modalClass = cn(rootClass(blockClass()));

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    type LocalizationKey = keyof typeof PICTURE_SETS;
    const pic:LocalizationKey = pictures as 'tours'|'shoots'|'prints';
    const pictureList = PICTURE_SETS[pic];

    return (
        <div {...rest} className={classNames(modalClass(), open && 'open')} ref={ref}>

            {pictureList &&
                <Swiper
                    navigation={true}
                    loop={true}
                    className="mySwiper"
                >
                    {pictureList.map((item, i) => (
                        <SwiperSlide
                            key={item}
                        >
                            <img
                                src={pictureList[i]}
                                alt=''
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }

            <div
                className={modalClass('close', ['link'])}
                onClick={() => {
                        updateState(!openModal)
                        const bodySel = document.body
                        bodySel.classList.remove("hidden")
                    }
                }
            >
                <div className={modalClass('bar')} />
                <div className={modalClass('bar')} />
            </div>
        </div>
    );
});

export { PrintsModal };
