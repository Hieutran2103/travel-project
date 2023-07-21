import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import logo from "../../assets/logo.svg";
// import logoNewfeed2 from "../../assets/logonewfeed2.svg";
import logoNewfeed from "../../assets/logonewfeed.svg";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useGlobalContextDarkMode } from "../../context/darkModeContext";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import { Link } from "react-router-dom";
import { useGlobalContextAuth } from "../../context/AuthContext";
import Search from "../search/Search";
import { useGlobalSearch } from "../../context/Search&Notification";

const LeftBar = () => {
  const { toggle, darkMode } = useGlobalContextDarkMode();
  const { logout } = useGlobalContextAuth();
  const { openSearch } = useGlobalSearch();
  return (
    <>
      <div className="leftBar">
        <div className="container">
          <div className="menu">
            <div className="logo">
              <img src={logoNewfeed} alt="" />
            </div>

            <div className="items active">
              <div className="icon">
                {" "}
                <HomeOutlinedIcon style={{ height: "30px", width: "30px" }} />
              </div>

              <span>Home</span>
            </div>
            <div className="items " onClick={openSearch}>
              <div className="icon">
                <SearchOutlinedIcon style={{ height: "30px", width: "30px" }} />
              </div>
              <span>Search</span>
            </div>
            <div className="items ">
              <div className="icon">
                {" "}
                <FavoriteBorderOutlinedIcon
                  style={{ height: "30px", width: "30px" }}
                />
              </div>

              <span>Notification</span>
            </div>
            <div className="items " onClick={toggle}>
              <div className="icon">
                {!darkMode ? (
                  <DarkModeOutlinedIcon
                    style={{ height: "30px", width: "30px" }}
                  />
                ) : (
                  <WbSunnyOutlinedIcon
                    style={{ height: "30px", width: "30px" }}
                  />
                )}
              </div>

              <span>{!darkMode ? "Dark mode" : "Light mode"}</span>
            </div>
            <div className="items ">
              <div className="icon">
                {" "}
                <GTranslateOutlinedIcon
                  style={{ height: "30px", width: "30px" }}
                />
              </div>

              <span>Translate</span>
            </div>
            <div className="profile ">
              <img
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7"
                alt=""
              />

              <span>Profile</span>
            </div>

            <div className="logout ">
              <div className="icon">
                <LogoutOutlinedIcon style={{ height: "30px", width: "30px" }} />
              </div>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <span onClick={logout}>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Search />
    </>
  );
};

export default LeftBar;
