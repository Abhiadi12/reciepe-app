import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { MenuBar, Avatar, Button } from "../common";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  const username = useSelector((state) => state.auth?.user?.username);
  const getFirstLetter = (name) => name.charAt(0).toUpperCase();

  return (
    <MenuBar className="justify-between">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex items-center">
        {username && (
          <div className="flex gap-4">
            <Button onClick={handleLogout}>Logout</Button>
            <Link to="/profile">
              <Avatar className="mr-2">{getFirstLetter(username)}</Avatar>
            </Link>
          </div>
        )}
      </div>
    </MenuBar>
  );
}

export default Header;
