import React from "react";
import "./No-internet.scss";
import Logo from "../../assets/logonewfeed2.svg";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import DevicesIcon from '@mui/icons-material/Devices';
import {Link} from "react-router-dom";

export default function Nointernet() {
  return (
    <div>
      <div className="all-of-noInternet">
      <div className="logot">
            <img className="logoto" src={Logo} alt="logo" />
          </div>
        <div className="second-content">
            <div className="symbol">
            <h1 className="icon-internet1"><AccessibilityIcon style={{ height: "150px", width: "150px" }} /></h1>
            <h1 className="icon-internet2"><SensorsOffIcon style={{ height: "150px", width: "150px" }} /></h1>
            <h1 className="icon-internet3"><DevicesIcon style={{ height: "150px", width: "150px" }} /></h1>
            </div>
          <h1 className="error-text1">
            Ouch! Lost Connection
          </h1>
          <h1 className="error-text">
            Please check your internet connection and try again
          </h1>
          {/* <p className="text-warning">
            The page you are looing for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.
          </p> */}
          <div className="btn-first">
            <Link className="linkto-home" to={"/"}> 
            Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
