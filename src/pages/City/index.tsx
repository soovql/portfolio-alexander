import * as React from "react";

type Props = {
    parentClass?: string;
};

const City: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    return (
        <div>
            City
        </div>
    )
};

export { City };
