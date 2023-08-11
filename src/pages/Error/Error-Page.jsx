import React from "react";
import "./Error-Page.scss";
import Logo from "../../assets/logonewfeed2.svg";
import {Link} from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <div className="all-of-error">
      <div className="logot">
            <img className="logoto" src={Logo} alt="logo" />
          </div>
        <div className="second-content">
    
          <section class="error-container">
            <span class="four">
              <span class="screen-reader-text">4</span>
            </span>
            <span class="zero">
              <span class="screen-reader-text">0</span>
            </span>
            <span class="four">
              <span class="screen-reader-text">4</span>
            </span>
          </section>
          <h1 className="error-text">
            Whoops, We can't seem to find the resource you're looking for.
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
