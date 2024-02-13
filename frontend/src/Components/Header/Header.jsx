import React from "react";
import { Link } from "react-router-dom";
import {headerPosition, headerContainer, headerlogo} from "./header.module.css";

function Header() {
  return (
    <>
      <div className={headerPosition}>
        <div className={headerContainer}>
          <Link to="/">
            <img
              alt="Home"
              className={headerlogo}
              src="/images/Greg Roques_LOGO.png"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
