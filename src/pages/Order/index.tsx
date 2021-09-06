import * as React from 'react';
import { cn } from '@bem-react/classname';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Logo } from '../../components/Logo';
import { Burger } from '../../components/Burger';
import { MenuPopup } from '../../components/MenuPopup';
import { Cursor } from '../../components/Cursor';
import { OrderMenu } from '../../components/OrderMenu';
import { Prints, PrintsModal, PICTURE_SETS } from './blocks';
import { OrderContainer } from './OrderContainer';
import { Parallax, useController } from 'react-scroll-parallax';


type Props = {
    parentClass?: string;
};

const Order: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [modalOpened, showModal] = useState(false);
    const [pictures, setPics] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const updateState = (open: boolean):void => {
        showModal(open);
    }

    const setPictureData = (pictures: string):void => {
        setPics(pictures);
    }

    const blockClass = 'order';
    const rootClass = cn(blockClass);

    const mobile = window.innerWidth < 599;

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const ParallaxCache = () => {
        const { parallaxController } = useController();

        useLayoutEffect(() => {
            const handler = () => parallaxController.update();
            window.addEventListener('load', handler);
            return () => window.removeEventListener('load', handler);
        }, [parallaxController]);

        return null;
    };

    return (

        <div
            className={rootClass({open})}
        >
            <Cursor auxClass={blockClass} />

            <Logo parentClass={blockClass} isHidden={open} />

            <MenuPopup parentClass={blockClass} open={open} />

            {!modalOpened &&
                <Burger parentClass={blockClass} open={open} setOpen={setOpen} color={"#B1B1B1"} barColor={"#424242"}/>
            }

            <div
                className={rootClass('wrapper', [open ? 'blurred' : undefined])}
            >
                <div data-scroll-speed="1">
                <div className={rootClass('header')}>
                    <ParallaxCache />
                    <Parallax className="custom-class layer5" y={[0, 0]}>
                        <div className="image" />
                    </Parallax>
                    <Parallax className="custom-class layer4" y={[50, 0]} x={[mobile ? -10 : 0, 10]}>
                        <div className="image" />
                    </Parallax>
                    <Parallax className="custom-class layer3" y={[50, 0]}>
                        <div className="image" />
                    </Parallax>
                    <Parallax className="custom-class layer2" y={[45, 0]} x={[mobile ? -10 : 0, mobile ? 10 : -5]}>
                        <div className="image" />
                    </Parallax>
                    <Parallax className="custom-class layer1" y={[25, 0]}>
                        <div className="image" />
                    </Parallax>
                </div>

                <OrderMenu parentClass={blockClass} auxClass={open ? 'hidden' : undefined}/>

                <div
                    className={rootClass('content')}
                >
                    <OrderContainer
                        parentClass={blockClass}
                        id="prints"
                        auxClass="reverse"
                        text={[
                            "Любую из&nbsp;представленных фоторабот можно заказать как отдельным принтом, так и&nbsp;оформленную в&nbsp;багет.",
                            "Просто напишите в&nbsp;мессенджере какой вариант вам нравится и я&nbsp;помогу в&nbsp;оформлении"
                        ]}
                        linkText="Хочу подобрать"
                    >
                        <Prints
                            parentClass={blockClass}
                            open={modalOpened}
                            updateState={updateState}
                            setPics={setPictureData}
                            data_id="prints"
                            pictureSet={PICTURE_SETS.prints}
                        />
                    </OrderContainer>

                    <OrderContainer
                        parentClass={blockClass}
                        id="shoots"
                        text={[
                            "Я&nbsp;открыт к&nbsp;коммерческим заказам на&nbsp;съемку недвижимости с&nbsp;земли или воздуха, а&nbsp;ткаже интерьеров (включая 360).",
                            "С&nbsp;удовольствием реализовываю коммерческие заказы, связанные с&nbsp;художественной фотографией"
                            ]}
                        linkText="Заказать съемку"
                    >
                        <Prints
                            parentClass={blockClass}
                            open={modalOpened}
                            updateState={updateState}
                            setPics={setPictureData}
                            data_id="shoots"
                            pictureSet={PICTURE_SETS.shoots}
                        />
                    </OrderContainer>

                    <OrderContainer
                        parentClass={blockClass}
                        auxClass="reverse"
                        id="tours"
                        text={[
                            "С&nbsp;удовольствием поделюсь знаниями, проведу мастер-класс или фотоэкскурсию по&nbsp;городу.",
                            "В&nbsp;скором времени начну водить фототуры и&nbsp;по&nbsp;скрытым уголкам России и&nbsp;Европы. Напишите мне, если хотите присоединиться, расскажу про ближайшие даты"
                        ]}
                        linkText="Хочу познакомиться"
                    >
                        <Prints
                            parentClass={blockClass}
                            open={modalOpened}
                            updateState={updateState}
                            setPics={setPictureData}
                            data_id="tours"
                            pictureSet={PICTURE_SETS.tours}
                        />
                    </OrderContainer>
                    </div>
                </div>
            </div>

            <PrintsModal
                parentClass={blockClass}
                open={modalOpened}
                updateState={updateState}
                pictures={pictures}
            />

            {isVisible && <a
                className={rootClass('buttonUp', ['link'])}
                onClick={
                    () => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }
                }
            />}
        </div>

    );
};

export { Order };
