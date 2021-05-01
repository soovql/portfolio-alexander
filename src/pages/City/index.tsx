import * as React from "react";
import {Logo} from "../../components/Logo";

type Props = {
    parentClass?: string;
};

const City: React.FC<Props> = (props) => {
    const blockClass = "city";

    return (
        <div>
            <Logo parentClass={blockClass}/>
            City
        </div>
    )
};

export { City };
