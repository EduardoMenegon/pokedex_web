import React, { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <>
      <footer
        className={`fixed bottom-0 left-0 w-full bg-red-700 text-white p-4 ${className}`}
      >
        {children}
      </footer>
      <div className="bg-red-700 fixed bottom-14 right-0 p-4 w-1/3 rounded-tl-3xl"></div>
    </>
  );
};

export default Footer;
