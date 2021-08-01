import * as React from 'react';
import { cn } from '@bem-react/classname';
import { useInViewport } from 'react-in-viewport';

const Prints: React.FC = () => {
    const myRef = React.createRef<HTMLDivElement>();
    const {
        inViewport
    } = useInViewport(
        myRef,
        { threshold: 0.7},
        { disconnectOnLeave: false },
        {}
    );

    const blockClass = cn('prints');

    return (
        <div className={blockClass()} ref={myRef}>
            <div className={blockClass('imageFront', ['image', inViewport ? 'animating' : undefined])}/>
            <div className={blockClass('imageLeft', ['image', inViewport ? 'animating' : undefined])}/>
            <div className={blockClass('imageRight', ['image', inViewport ? 'animating' : undefined])}/>
        </div>
    );
};

export { Prints };
