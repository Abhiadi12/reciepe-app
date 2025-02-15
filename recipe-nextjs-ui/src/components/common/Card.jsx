import React from "react";

const Card = ({ className = "", children, ...props }) => {
  const classes = `rounded-lg border bg-card text-card-foreground shadow-sm ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
