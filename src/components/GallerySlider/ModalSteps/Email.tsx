import React from "react";
import { cn } from '@bem-react/classname';
import { useState } from 'react';
// import { useForm } from "react-hook-form";

type EmailProps = {
    parentClass: string;
    setUserInput: (v: string) => void;
}

const Email = React.forwardRef<HTMLInputElement, EmailProps> (function Email(props, ref) {
    const { parentClass, setUserInput, ...rest  } = props;
    const blockClass = cn(parentClass);

    // передаю данные обратно
    const [input, setInput] = useState('');

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        setUserInput(event.currentTarget.value);
    }

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    //
    // const onSubmit = (data: any) => console.log(data);
    return (
        <div
            className={blockClass('form')}
            {...rest}
        >
            <input
                type="text"
                name="email"
                id="email"
                value={input} onInput={e => handleOnChange(e)}
                placeholder="введите ваш телефон или email"
                ref={ref}
            />
             {/* @todo валидация*/}
            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <input*/}
            {/*        id="email"*/}
            {/*        placeholder="введите ваш телефон или email"*/}
            {/*        {...register("email", { required: true, min: 3, maxLength: 30 })}*/}
            {/*    />*/}
            {/*    /!* errors will return when field validation fails  *!/*/}
            {/*    {errors.email && errors.email.type === "required" && <span>This is required</span>}*/}
            {/*    {errors.email && errors.email.type === "maxLength" && <span>Max length exceeded</span> }*/}
            {/*</form>*/}
        </div>
    );
});

export {Email};
