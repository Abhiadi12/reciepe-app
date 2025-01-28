import React from "react";
import { MenuBar, Avatar, Button } from "../common";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  const { user } = useSelector((state) => state.auth);
  return (
    <MenuBar className="justify-between">
      <Logo />
      <div className="flex items-center">
        {user && (
          <div className="flex gap-4">
            <Button onClick={handleLogout}>Logout</Button>
            <Avatar className="mr-2">U</Avatar>
          </div>
        )}
      </div>
    </MenuBar>
  );
}

export default Header;
