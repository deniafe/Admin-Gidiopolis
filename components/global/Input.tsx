import React, { useState } from 'react';

interface InputProps {
  label: string;
  len?: number
  type: string;
  handleChange: (e: string) => void;
  value?: string;
  rules?: (e: string) => Boolean
  errorMessage?: string
}

export function Input({ label, len = 200, type, handleChange, value, rules, errorMessage = 'Invalid input' }: InputProps) {
  const [isNotValid, setIsNotValid] = useState(false);

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value)
    if(rules) {
      rules(e.target.value) ? setIsNotValid(true) : setIsNotValid(false)
    }
    console.log('Change is being handled', e.target.value)
  } 

  const inputClassName = `bg-blue-50 text-neutral-700 peer text-sm font-medium block min-h-[auto] w-full rounded-full px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
    isNotValid ? 'border border-red-500' : ''
  }`;

  return (
    <>
      <small>
        {label}
      </small>
      <input
        type={type}
        onChange={validate}
        maxLength={len}
        value={value}
        className={inputClassName}  />
        {
          isNotValid && 
          (
            <div className='text-danger text-center text-xs'>
              {errorMessage}
            </div>
          )
        }
       
    </>
  );
}
