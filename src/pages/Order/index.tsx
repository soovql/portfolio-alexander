import * as React from "react";
import {Logo} from "../../components/Logo";

type Props = {
    parentClass?: string;
};

const Order: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    const blockClass = "order";

    return (
        <div
            className={blockClass}
        >
            <Logo parentClass={blockClass}/>
            ORDER
        </div>
    )
};

export { Order };
