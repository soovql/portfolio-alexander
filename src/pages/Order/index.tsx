import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Logo } from '../../components/Logo';
import { useState } from 'react';
import { Burger } from '../../components/Burger';
import { MenuPopup } from '../../components/MenuPopup';
import { Cursor } from '../../components/Cursor';
import { OrderMenu } from '../../components/OrderMenu';
import { OrderLink } from '../../components/OrderLink';
import {GalleryCommercial} from "./GalleryCommercial";
import {OrderContainer} from "./OrderContainer";

type Props = {
    parentClass?: string;
};

const Order: React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);

    const blockClass = 'order';
    const rootClass = cn(blockClass);

    return (
        <div
            className={blockClass}
            // @todo change
            style={{
                backgroundImage:
                    'linear-gradient(175deg, rgba(122,122,122,0.6446953781512605) 35%, rgba(255,255,255,0) 100%)',
                backgroundColor: '#fff',
            }}
        >
            <Cursor />
            <Logo parentClass={blockClass} isHidden={open} />
            <Burger parentClass={blockClass} open={open} setOpen={setOpen} />
            <MenuPopup parentClass={blockClass} open={open} />
            <div className={rootClass('wrapper')}>
                <OrderMenu parentClass={blockClass} />
                <div className={rootClass('content')}>
                    <OrderContainer
                        parentClass={blockClass}
                        id="prints"
                        text={[
                            "Любую из&nbsp;представленных фоторабот можно заказать как отдельным <span>принтом</span>, так и&nbsp;оформленную в&nbsp;багет.",
                            "Просто напишите в&nbsp;мессенджере какой вариант вам нравится и&nbsp;я&nbsp;помогу в&nbsp;оформлении."
                        ]}
                        linkText="Давай определимся"
                    />

                    <OrderContainer
                        parentClass={blockClass}
                        id="shoots"
                        text="Я&nbsp;открыт к&nbsp;коммерческим заказам на&nbsp;<span>съемку</span>: недвижимости (включая аэросъемку и&nbsp;360) интерьеров городских lifestyle сюжетов"
                        linkText="Расскажи подробнее"
                    >
                        <GalleryCommercial parentClass={blockClass}/>
                    </OrderContainer>

                    <OrderContainer
                        parentClass={blockClass}
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
                        linkText="С&nbsp;этого момента поподробнее"
                    />
                </div>
            </div>
        </div>
    );
};

export { Order };
