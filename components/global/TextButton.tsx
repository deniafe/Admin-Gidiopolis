import React, { ReactNode, MouseEvent } from 'react';

interface ReusableButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const TextButton: React.FC<ReusableButtonProps> = ({ children, onClick }) => {
  return (
    <div
      data-te-ripple-init
      data-te-ripple-color="light"
      className="mr-3 inline-block cursor-pointer rounded-full px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-[#31859C] transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none"       
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TextButton;