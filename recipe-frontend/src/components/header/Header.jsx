import React from "react";
import { MenuBar, Avatar } from "../common";
import Logo from "./Logo";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <MenuBar className="justify-between">
      <Logo />
      <div className="flex items-center">
        {user && (
          <Avatar className="mr-2">
            {user.name.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </div>
    </MenuBar>
  );
}

export default Header;
