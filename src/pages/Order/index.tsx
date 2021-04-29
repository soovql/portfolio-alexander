import * as React from "react";

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
            ORDER
        </div>
    )
};

export { Order };
