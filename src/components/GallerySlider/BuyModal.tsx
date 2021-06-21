import * as React from 'react';
import { useState } from 'react';
import { cn } from '@bem-react/classname';
import classNames from 'classnames';
import { Size, Email, FinalStep } from "./ModalSteps";
import * as TEXT from "../../nature.json";

type IBuyModalProps = {
    open_buy: boolean;
    current_item: number;
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
    const { open_buy, current_item, ...rest } = props;

    const blockClass = 'modalBuy';
    const modalClass = cn('modalBuy');

    const [userData, setUserData] = useState('');
    const [userSize, setUserSize] = useState(0);

    const steps = [
        <Size key={0} parentClass={blockClass} current_item={current_item} setUserSize={setUserSize}/>,
        <Email key={1} parentClass={blockClass} setUserInput={setUserData}/>,
        <FinalStep key={2} parentClass={blockClass} />
    ];

    const [currentStep, goForward, goBack ] = useFormProgress();
    const isFirst = currentStep === 0;
    const isSecond = currentStep === steps.length - 2;
    const isLast = currentStep === steps.length - 1;

   const handleSubmit = (userData: string, current_item: number) => {
       // time to send data
       console.log(
           "контактные данные: " + userData,
           "название: " + TEXT[current_item].title,
           "размер: " + TEXT[current_item].prices[userSize].size,
           "стоимость: " + TEXT[current_item].prices[userSize].price,
       );
   };


    return (
        <div {...rest} className={classNames(modalClass(), open_buy && 'open')} ref={ref}>
            <div className={modalClass("content")}>
                {/*@ts-ignore*/}
                {steps[currentStep]}
            </div>
            {!isLast &&
                <button
                    className={modalClass("next", ['orderLink'])}
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
            {!isFirst &&
                <button
                    // @ts-ignore
                    onClick={() => goBack()}
                    className={modalClass("back", ['modal_button'])}
                >
                    Назад
                </button>
            }
        </div>
    );
});

export { BuyModal };
