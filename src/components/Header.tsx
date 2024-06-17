import React, { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <>
      <header className={`fixed top-0 left-0 w-full bg-red-700 text-white p-4 ${className}`}>
        {children}
      </header>
        <div className="bg-red-700 fixed top-12 left-0 p-3 w-1/3 rounded-br-3xl"></div>


    </>
  );
};

export default Header;
