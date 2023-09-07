/* eslint-disable react-hooks/rules-of-hooks */
import {useTranslation} from "react-i18next";
import {useGlobalContextAuth} from "../../context/AuthContext";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import customFetch from "../../utils/url";
import "./rightBar.scss";

const RightBar = () => {
  const {currentUser} = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  const navigate = useNavigate();
  const navigateAccUser = () => {
    return navigate("/setting/account");
  };

  const apiUrlRandom = `vacations/random`;

  const fetchVacationsRandom = async () => {
    try {
      const response = await customFetch.get(apiUrlRandom);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching vacations data");
    }
  };

  const {
    data: vacationsData,
    isLoading: isVacationsLoading,
    isError: isVacationsError,
  } = useQuery(["vacationsData", apiUrlRandom], fetchVacationsRandom, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isVacationsLoading) {
    return;
  }

  if (isVacationsError) {
    return;
  }

  const vacations = vacationsData.data;

  return (
    <div className="rightBar">
      <div className="container">
        <div className="menu">
          <div className="myself" onClick={navigateAccUser}>
            <img
              src={
                !currentUser?.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : currentUser?.avatar
              }
              alt=""
            />

            <div className="info">
              <div className="name">{currentUser?.name}</div>
              <div className="email">{currentUser?.email}</div>
            </div>
            <Link to="/setting/account">
              <div className="switch">
                <MoreVertOutlinedIcon />
              </div>
            </Link>
          </div>

          <div className="suggestCon">
            <p className="suggest"> {t("rightBar.suggest")} </p>
            <div className="others">
              {vacations.slice(0, 5).map((vacation) => (
                <div key={vacation._id} className="other">
                  <img src={vacation.vacation_avatar} alt="" />
                  <div className="info">
                    <div className="name">{vacation.vacation_name}</div>
                    <div className="text">{vacation.vacation_intro}</div>
                  </div>
                  <div
                    className="follow"
                    onClick={() => {
                      navigate(`/vacation/${vacation?._id}`);
                      // window.location.reload();
                    }}
                  >
                    {" "}
                    {t("rightBar.visit")}
                  </div>
                </div>
              ))}
            </div>
            <footer>
              <p>
                About Help Press API Jobs Privacy Terms Locations Language
                English Meta Verified
              </p>
              <p>© 2023 TRAVEL FROM RICH KIDS</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
