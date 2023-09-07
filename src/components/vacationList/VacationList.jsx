import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useGlobalPage} from "../../context/Page";
import customFetch from "../../utils/url";
import "./vacationList.scss";
import {useNavigate} from "react-router-dom";

function VacationList() {
  const {page, limit, handleNextLimit} = useGlobalPage();
  const url = window.location.pathname.split("/");
  const userID = url[url.length - 2];
  const navigate = useNavigate();

  const apiUrlVacation = `vacations/vacation-user/${userID}?limit=${limit}&page=${page}`;

  const fetchVacationInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlVacation);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching vacation data");
    }
  };

  const {
    data: vacationData,
    isLoading: isVacationLoading,
    isError: isVacationError,
  } = useQuery(["userData", apiUrlVacation], fetchVacationInfo);

  if (isVacationLoading) {
    return;
  }

  if (isVacationError) {
    return;
  }

  const vacation = vacationData.data;

  if (vacation.length === 0) {
    return (
      <div className="vacationContainer">
        <p className="noAlbumsMessage">No vacation to show</p>
      </div>
    );
  }

  console.log(vacation);
  return (
    <div className="vacationContainer">
      {vacation.map((item) => (
        <div key={item._id} className="vacationList">
          <div
            className="container"
            onClick={() => {
              navigate(`/vacation/${item._id}`);
              window.location.reload();
            }}
          >
            <img
              className="imgVacation"
              src={`${item.vacation_avatar}`}
              alt="image"
            />
            <div className="details">
              <div className="info">
                <div>
                  <h3>{item.vacation_name}</h3>
                </div>
                <div
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {item.vacation_intro}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    marginTop: "10px",
                  }}
                >
                  {item.vacation_description}
                </div>
              </div>
              <div>
                <div className="status">{item.status}</div>
              </div>
              <div className="date">{item.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VacationList;
