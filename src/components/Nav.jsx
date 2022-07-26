import React from "react";
import InstagramLogo from "../assets/InstagramLogo.png";

const Nav = () => {
  return (
    <nav>
      <div className="wrapper">
        <button className="logo">
          <img src={InstagramLogo} alt="logo" />
        </button>{" "}
        <input type="text" className="search" placeholder="search" />
        <span className="nav-links">
          <button>
            <i className="fas fa-home" />
          </button>
          <button>
            <i className="fas fa-comment-alt" />
          </button>
          <button>
            <i className="fas fa-compass" />
          </button>
          <button>
            <i className="fas fa-heart" />
          </button>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
