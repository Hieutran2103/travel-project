import React from "react";
import "./vacationList.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    user: "Hien",
    status: "Private",
    date: "02/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    user: "Hien",
    status: "Public",
    date: "22/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    user: "Hien",
    status: "Public",
    date: "22/05/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    user: "Hien",
    status: "Public",
    date: "02/07/2023",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    user: "Hien",
    status: "Private",
    date: "12/07/2023",
  },
];

function VacationList() {
  return (
    <div>
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
