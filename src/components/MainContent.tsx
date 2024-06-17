import React, { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

const MainContent: React.FC<MainContentProps> = ({ children, className }) => {
  return <main className={`p-4 ${className}`}>{children}</main>;
};

export default MainContent;
