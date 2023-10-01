import React, { useEffect, useState } from 'react';

interface SelectInputProps {
  label: string;
  items: string[];
  value?: string;
  handleChange: (value: string) => void; 
}

export function SelectInput({ label, items, value, handleChange }: SelectInputProps) {

  const [selected, setSelected] = useState<string>('Select option');

  const handleSelectChange = (val: string) => {
      setSelected(val)
      handleChange(val)
  };

  useEffect(() => {
    if(value) {
      setSelected(value)
    }
  }, []);

  return (
    <>
      <small>{label}</small>
      <div
        className="relative text-sm font-medium bg-blue-50 text-gray-800 peer block min-h-[auto] w-full rounded-full px-3 py-[0.4rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        data-te-dropdown-ref
      >
        <a
          className="flex justify-between items-center text-neutral-700 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
          type="button"
          id="dropdownMenuButton2"
          data-te-dropdown-toggle-ref
          aria-expanded="false"
        >
          {selected}
          <span className="mr-2 w-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </a>
        <ul
          className="absolute z-[1000] m-0 top-8 hidden w-11/12 list-none rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButton2"
          data-te-dropdown-menu-ref
          style={{ marginLeft: '-50%', maxHeight: '200px', overflowY: 'auto' }}  
        >
          {items.map((item, index) => (
            <li onClick={() => handleSelectChange(item)} key={index}>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                data-te-dropdown-item-ref
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
