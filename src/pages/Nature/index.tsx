import * as React from "react";

type Props = {
    parentClass?: string;
};

const Nature: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    return (
        <div>
            Nature
        </div>
    )
};

export { Nature };
