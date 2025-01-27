import * as React from "react";

const MenuBar = ({ children, className = "", ...props }, ref) => (
  <div
    className={`${className} flex h-16 items-center space-x-1 border fixed top-0 left-0 right-0 bg-gray-100 p-1`}
    {...props}
  >
    {children}
  </div>
);

export default MenuBar;
