import * as React from 'react';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';
import { Size, Email, FinalStep } from "./ModalSteps";
import * as CITY_DATA from "../../city.json";
import * as NATURE_DATA from "../../nature.json";
import {GalleryTypes} from "../../GalleryTypes";
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

type IBuyModalProps = {
    open_buy: boolean;
    setOpen: (v: boolean) => void;
    current_item: number;
    type: GalleryTypes;
};

function useFormProgress() {
    const [currentStep, setCurrentStep] = useState(0);

    function goForward() {
        setCurrentStep(currentStep + 1);
    }

    function goBack() {
        setCurrentStep(currentStep - 1);
    }

    return [currentStep, goForward, goBack];
}

const BuyModal = React.forwardRef<HTMLDivElement, IBuyModalProps>(function BuyModal(props, ref) {
    const { open_buy, current_item, setOpen, type, ...rest } = props;

    const blockClass = 'modalBuy';
    const modalClass = cn('modalBuy');

    const [userData, setUserData] = useState('');
    const [userSize, setUserSize] = useState(0);

    const TEXT = (type === "City" ? CITY_DATA : NATURE_DATA);

    const steps = [
        <Size key={0} parentClass={blockClass} current_item={current_item} setUserSize={setUserSize}/>,
        <Email key={1} parentClass={blockClass} setUserInput={setUserData}/>,
        <FinalStep key={2} parentClass={blockClass} />
    ];

    const [currentStep, goForward, goBack ] = useFormProgress();
    const isFirst = currentStep === 0;
    const isSecond = currentStep === steps.length - 2;
    const isLast = currentStep === steps.length - 1;

    // проверяем, что в инпуте больше 3 символов
    const input_disabled = (isSecond && (!isEmail(userData, {allow_utf8_local_part: true})) && isSecond && !isMobilePhone(userData, 'ru-RU', {strictMode: false}));

    const handleSubmit = (userData: string, current_item: number) => {
       // time to send data
        // @todo add handlers
       console.log(
           "контактные данные: " + userData,
           // @todo добавить проверку на наличии заголовка и размера
           "название: " + TEXT[current_item].title,
           "размер: " + TEXT[current_item].prices[userSize].size,
           "стоимость: " + TEXT[current_item].prices[userSize].price,
       );
    };

    const closeBuy = () => {
        setOpen(!open_buy);
    }

    return (
        <div {...rest} className={classNames(modalClass(), open_buy && 'open')} ref={ref}>
            <div className={modalClass("content")}>
                <TransitionGroup className={'wrapper'}>
                    {/*@ts-ignore*/}
                    <CSSTransition key={currentStep} classNames="step" timeout={100}>
                        {/*@ts-ignore*/}
                        {steps[currentStep]}
                    </CSSTransition>
                </TransitionGroup>
            </div>
            {!isLast &&
                <button
                    className={modalClass("next", ['orderLink', input_disabled ? 'disabled' : undefined])}
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        if (isSecond) {
                            handleSubmit(userData, current_item);
                            // @ts-ignore
                            goForward();
                        } else {
                            // @ts-ignore
                            goForward();
                        }
                    }}
                >
                    <a>
                        {isSecond ? 'отправить' : 'Далее'}
                    </a>
                </button>
            }
            <button
                onClick={() =>
                    // @ts-ignore
                    isFirst ? closeBuy() : goBack()
                }
                className={modalClass("back", ['modal_button'])}
            >
                Назад
            </button>
        </div>
    );
});

export { BuyModal };
