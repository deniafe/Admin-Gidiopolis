import React, { useState } from 'react';

interface TextAreaProps {
  label: string;
  type: string;
  handleChange: (e: string) => void;
  value?: string;
  rules?: (e: string) => Boolean
  errorMessage?: string
}

export function TextArea({ label, type, handleChange, value, rules, errorMessage = 'Invalid input' }: TextAreaProps) {
  const [isNotValid, setIsNotValid] = useState(false);

  const validate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(rules) {
      rules(e.target.value) ? setIsNotValid(true) : setIsNotValid(false)
    }
    handleChange(e.target.value)
  }

  return (
    <>
      <small>{label}</small>
      <textarea
        rows={3}
        value={value}
        onChange={validate}
        className="bg-blue-50 text-gray-800 peer text-sm font-medium block min-h-[auto] w-full rounded-full px-5 py-[0.8rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlInput1"
        placeholder="Name"
      />
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
