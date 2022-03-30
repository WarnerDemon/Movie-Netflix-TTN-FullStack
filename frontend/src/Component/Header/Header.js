import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logo } from "../../imports/image";
import { LogoutInitiate } from "../../Redux/Action/ActionAuth";
import { HeaderStyle } from "../../Style/HeaderStyle/HeaderStyle";
const Header = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogout = () => {
    dispatch(LogoutInitiate());
    toast.success("Logout Success Thank You!");
  };
  useEffect(() => {
    if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/feedback") {
      setActiveTab("Feedback");
    } else if (location.pathname === "/write") {
      setActiveTab("Write");
    } else if (location.pathname === "/products") {
      setActiveTab("Products");
    }
  }, [location]);

  return (
    <>
      <HeaderStyle />
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img src={logo} alt="" />
            <span to="/" className="link ">
              <span
                onClick={() => navigate("/home")}
                className={` ${activeTab === "Home" ? "active" : ""}`}
              >
                Home
              </span>
            </span>
            <span to="/series" className="link">
              <span className="navbarmainLinks">TV Shows</span>
            </span>
            <span to="/movies" className="link">
              <span className="navbarmainLinks">Movies</span>
            </span>
            <span>New & Popular</span>
            <span
              onClick={() => navigate("/feedback")}
              className={` ${activeTab === "Feedback" ? "active" : ""}`}
            >
              My List
            </span>
          </div>
          <div className="right">
            <i className="icon fas fa-search" />

            <span>{profile.fullname || profile.name}</span>

            <i className=" icon fas fa-bell" />
            {profile.image && (
              <img
                src={profile.image.url}
                alt=""
                onClick={() => navigate("/profile")}
              />
            )}

            <div className="profile">
              <i className="fas fa-caret-down"></i>
              <div className="options">
                <span>Settings</span>
                <span onClick={handleLogout}>Logout</span>
              </div>
            </div>
          </div>

          <label htmlFor="nav-mobile-input" className="navbar_mobile">
            <i className="fa-solid fa-bars-progress"></i>
          </label>
          <input
            type="checkbox"
            hidden
            name=""
            className="nav_input"
            id="nav-mobile-input"
          />
          <label htmlFor="nav-mobile-input" className="navbar-overplay"></label>
          <nav className="nav_mobile">
            <label htmlFor="nav-mobile-input" className="nav_mobile_close">
              <i className="fa-solid fa-circle-xmark"></i>
            </label>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
