import * as React from "react";

const Avatar = ({ className, children, ...props }) => (
  <div
    className={`${className} relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-primary text-primary-foreground cursor-pointer`}
    {...props}
  >
    {children}
  </div>
);
Avatar.displayName = "Avatar";

export default Avatar;
