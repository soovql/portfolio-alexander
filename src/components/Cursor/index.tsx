import * as React from 'react';
import { useState, useEffect } from "react";
import classNames from 'classnames';

type Props = {
    parentClass?: string;
};

const Cursor: React.FC<Props> = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [linkHover, setLinkHover] = useState(false);
    const [pictureHover, setPictureHover] = useState(false);
    const [arrowHoverLeft, setArrowHoverLeft] = useState(false);
    const [arrowHoverRight, setArrowHoverRight] = useState(false);


    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', mMove);
            document.addEventListener('mouseenter', mEnter);
            document.addEventListener('mouseleave', mLeave);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseenter', mEnter);
            document.removeEventListener('mouseleave', mLeave);
        };

        const mMove = (el: any) => {
            setPosition({ x: el.clientX, y: el.clientY });
        };

        const mLeave = () => {
            setHidden(true);
        };

        const mEnter = () => {
            setHidden(false);
        };


        const addLinkEvents = () => {
            document.querySelectorAll('a:not(.noclick)').forEach((el) => {
                el.addEventListener('mouseover', () => setLinkHover(true));
                el.addEventListener('mouseout', () => setLinkHover(false));
            });
            document.querySelectorAll('.link').forEach((el) => {
                el.addEventListener('mouseover', () => setLinkHover(true));
                el.addEventListener('mouseout', () => setLinkHover(false));
            });
        };

        const arrowLeftEvents = () => {
            document.querySelectorAll('.arrow_direction_left').forEach((el) => {
                el.addEventListener('mouseover', () => setArrowHoverLeft(true));
                el.addEventListener('mouseout', () => setArrowHoverLeft(false));
            });
        };

        const arrowRightEvents = () => {
            document.querySelectorAll('.arrow_direction_right').forEach((el) => {
                el.addEventListener('mouseover', () => setArrowHoverRight(true));
                el.addEventListener('mouseout', () => setArrowHoverRight(false));
            });
        };

        const hoverPictureEvents = () => {
            document.querySelectorAll('.picture').forEach((el) => {
                el.addEventListener('mouseover', () => setPictureHover(true));
                el.addEventListener('mouseout', () => setPictureHover(false));
            });
        };

        addEventListeners();
        addLinkEvents();
        arrowLeftEvents();
        arrowRightEvents();
        hoverPictureEvents();
        return () => removeEventListeners();
    }, []);


    const blockClass = 'cursor';

    return (
        <div
            className={classNames(
                blockClass,
                hidden && 'hidden',
                linkHover && 'hover',
                pictureHover && 'picture',
                arrowHoverLeft && 'arrow-left',
                arrowHoverRight && 'arrow-right'
            )}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
}

export { Cursor };
