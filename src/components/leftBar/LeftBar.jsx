import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import logo from "../../assets/logo.svg";
import logoNewfeed from "../../assets/logonewfeed.svg";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {useGlobalContextDarkMode} from "../../context/darkModeContext";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import {Link, useNavigate} from "react-router-dom";
import {useGlobalContextAuth} from "../../context/AuthContext";
import Search from "../search/Search";
import {useGlobalSearch} from "../../context/Search&Notification";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Notification from "../Notification/Notification";
import customFetch from "../../utils/url";
import {useMutation} from "@tanstack/react-query";

const LeftBar = () => {
  const {toggle, darkMode} = useGlobalContextDarkMode();
  const {setCurrentUser} = useGlobalContextAuth();
  const {openSearch, openNotifi} = useGlobalSearch();
  const [t, i18] = useTranslation("global");
  const [isLanguageViet, setIsLanguageViet] = useState(false);
  const {currentUser} = useGlobalContextAuth();
  const navigate = useNavigate();

  const handleChangeViet = () => {
    i18.changeLanguage("vi");
    setIsLanguageViet(true);
  };
  const handleChangeEng = () => {
    i18.changeLanguage("en");
    setIsLanguageViet(false);
  };

  const logoutMutation = useMutation({
    mutationFn: () =>
      customFetch.post("/users/logout", {
        refresh_token: localStorage.getItem("refresh_token"),
      }),
    onSuccess: (data) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setCurrentUser(null);
      console.log(data);
      navigate("/login");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <div className="leftBar">
        <div className="container">
          <div className="menu">
            <div className="logo">
              <Link style={{textDecoration: "none", color: "inherit"}} to="/">
                <img src={logoNewfeed} alt="" />
              </Link>
            </div>

            <div className="items">
              <div className="icon">
                {" "}
                <HomeOutlinedIcon style={{height: "30px", width: "30px"}} />
              </div>
              <Link style={{textDecoration: "none", color: "inherit"}} to="/">
                <span>{t("leftBar.home")}</span>
              </Link>
            </div>
            <div className="items" onClick={openSearch}>
              <div className="icon">
                <SearchOutlinedIcon style={{height: "30px", width: "30px"}} />
              </div>
              <span>{t("leftBar.search")}</span>
            </div>
            <div className="items " onClick={openNotifi}>
              <div className="icon">
                {" "}
                <FavoriteBorderOutlinedIcon
                  style={{height: "30px", width: "30px"}}
                />
              </div>

              <span>{t("leftBar.notifi")}</span>
            </div>
            <div className="items " onClick={toggle}>
              <div className="icon">
                {!darkMode ? (
                  <DarkModeOutlinedIcon
                    style={{height: "30px", width: "30px"}}
                  />
                ) : (
                  <WbSunnyOutlinedIcon
                    style={{height: "30px", width: "30px"}}
                  />
                )}
              </div>

              <span>{!darkMode ? t("leftBar.dark") : t("leftBar.light")}</span>
            </div>
            <div
              className="items "
              onClick={
                !isLanguageViet
                  ? () => handleChangeViet()
                  : () => handleChangeEng()
              }
            >
              <div className="icon">
                {" "}
                <GTranslateOutlinedIcon
                  style={{height: "30px", width: "30px"}}
                />
              </div>

              <span>{t("leftBar.language")}</span>
            </div>
            <div className="profile">
              <img
                src={
                  !currentUser?.avatar
                    ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                    : currentUser?.avatar
                }
                alt=""
              />

              <a
                href={`/profile/${currentUser?._id}/posts`}
                style={{textDecoration: "none", color: "inherit"}}
              >
                <span>{t("leftBar.profile")}</span>
              </a>
            </div>

            <div className="logout ">
              <div className="icon">
                <LogoutOutlinedIcon style={{height: "30px", width: "30px"}} />
              </div>
              <Link
                style={{textDecoration: "none", color: "inherit"}}
                to="/login"
              >
                <span onClick={logout}>{t("leftBar.logout")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Search />
      <Notification />
    </>
  );
};

export default LeftBar;
