import React from "react";
import {cn} from "@bem-react/classname";

type FinalStepProps = {
    parentClass: string;
}

const FinalStep: React.FC<FinalStepProps> = (props) => {
    const { parentClass  } = props;
    const blockClass = cn(parentClass);

    return (
        <div className={blockClass('final')}>
            спасибо!
        </div>
    );
}

export {FinalStep};
