import * as React from "react";
import {cn} from "@bem-react/classname";
import logo from '../../styles/images/logo.svg'

type Props = {
    parentClass?: string;
    auxClass?: string;
};

const Logo: React.FC<Props> = (props) => {
    const {
        parentClass,
        auxClass,
    } = props;

    const blockClass = 'logo';
    const logoClass = cn(parentClass!)(blockClass, [blockClass]);

    return (
        <img
            className={logoClass}
            src={logo}
            alt="logo sasha stukhin"
        />
    )
};

export { Logo };
