import * as React from "react";
import {NavLink} from "react-router-dom";
import {cn} from "@bem-react/classname";
import logo from '../../styles/images/logo.svg'
import LogoImage from '../../styles/images/logo.svg'


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
        <NavLink to="/" className={logoClass}>
            {/*<img*/}
            {/*    src={logo}*/}
            {/*    alt="logo sasha stukhin"*/}
            {/*/>*/}
            <LogoImage
                fill={"#000"}
            />
        </NavLink>

    )
};

export { Logo };
