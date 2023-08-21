import React from "react";
import "./vacationList.scss";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
];

function VacationList() {
  return (
    <div className="vacationContainer">
      {itemData.map((item) => (
        <div className="vacationList">
          <div className="container">
            <img className="imgVacation" src={`${item.img}`} alt="image" />
            <div className="details">
              <div className="info">
                <div>
                  <h3>{item.title}</h3>
                </div>
                <div
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Paris, capital of France, is one of the most important and
                  influential cities in the world. In terms of tourism, Paris is
                  the second most visited city in Europe after London.
                </div>
                <div
                  style={{
                    marginTop: "5px",
                  }}
                >
                  By {item.user}
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
