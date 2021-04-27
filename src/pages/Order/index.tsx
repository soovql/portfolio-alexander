import * as React from "react";

type Props = {
    parentClass?: string;
};

const Order: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    return (
        <div>
            ORDER
        </div>
    )
};

export { Order };
