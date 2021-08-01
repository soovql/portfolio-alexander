import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Logo } from '../../components/Logo';
import { useState } from 'react';
import { Burger } from '../../components/Burger';
import { MenuPopup } from '../../components/MenuPopup';
import { Cursor } from '../../components/Cursor';
import { OrderMenu } from '../../components/OrderMenu';
import { GalleryCommercial, Prints } from "./blocks";
import { OrderContainer } from "./OrderContainer";
import { Parallax } from 'react-scroll-parallax';

type Props = {
    parentClass?: string;
};

const Order: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);

    const blockClass = 'order';
    const rootClass = cn(blockClass);

    const mobile = window.innerWidth < 599;

    return (

        <div
            className={rootClass()}
        >
            <Cursor auxClass={blockClass} />
            <Logo parentClass={blockClass} isHidden={open} />

            <MenuPopup parentClass={blockClass} open={open} />
            <Burger parentClass={blockClass} open={open} setOpen={setOpen} barColor={"#424242"}/>

            <div
                className={rootClass('wrapper', [open ? 'blurred' : undefined])}
            >
                <div data-scroll-speed="1">
                <div className={rootClass('header')}>
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
                            auxClass="reverse"
                            id="prints"
                            text={[
                                "Любую из&nbsp;представленных фоторабот можно заказать как отдельным <span>принтом</span>, так и&nbsp;оформленную в&nbsp;багет.",
                                "Просто напишите в&nbsp;мессенджере какой вариант вам нравится и&nbsp;я&nbsp;помогу в&nbsp;оформлении."
                            ]}
                            linkText="Давай определимся"

                        >
                            <Prints/>
                        </OrderContainer>

                        <OrderContainer
                            parentClass={blockClass}
                            id="shoots"
                            text={[
                                "Я открыт к&nbsp;коммерческим заказам на&nbsp;<span>съемку</span> недвижимости с&nbsp;земли или&nbsp;воздуха, а&nbsp;также интерьеров (включая&nbsp;360).",
                                "Примеры работ можно посмотреть в&nbsp;моём инстаграме и&nbsp;там же договориться о&nbsp;сотрудничестве."
                                ]}
                            linkText="Давай посмотрим"
                        >
                            <GalleryCommercial parentClass={blockClass}/>
                        </OrderContainer>

                        <OrderContainer
                            parentClass={blockClass}
                            auxClass="reverse"
                            id="tours"
                            text="Сейчас я&nbsp;сам езжу с&nbsp;лучшими пейзажистами в&nbsp;<span>туры</span>, чтобы набраться
                                опыта и&nbsp;скоро буду готов проводить подобные истории. Но&nbsp;ничто не&nbsp;мешает нам
                                с&nbsp;вами встретиться в&nbsp;Москве, чтобы я&nbsp;показал живописные и&nbsp;не&nbsp;самые
                                очевидные уголки города."
                            linkText="Давай прогуляемся"
                        />

                        <OrderContainer
                            parentClass={blockClass}
                            id="more"
                            text="Вам понравился этот <span>сайт</span>? Если, да, то, если хотите себе классный лендинг,
                                то&nbsp;скорее всего я&nbsp;смогу вам помочь. Также я&nbsp;уже 10&nbsp;лет занимаюсь
                                <span>маркетингом</span> и&nbsp;оказываю консальтуционные услуги."
                            linkText="Давай обсудим"
                        />
                    </div>
                </div>

            </div>
        </div>

    );
};

export { Order };
