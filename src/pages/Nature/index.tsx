import * as React from "react";
import {Logo} from "../../components/Logo";

type Props = {
    parentClass?: string;
};

const Nature: React.FC<Props> = (props) => {
    const {
        parentClass,
    } = props;

    const blockClass = "nature";

    return (
        <div>
            <Logo parentClass={blockClass}/>
            Nature
        </div>
    )
};

export { Nature };
