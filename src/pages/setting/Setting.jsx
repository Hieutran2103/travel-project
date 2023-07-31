import { Link } from "react-router-dom";
import "./setting.scss";

const Setting = () => {
  return (
    <>
      <div className="container-set">
        <h1>Settings</h1>
        <div className="form-box">
          <div className="nav">
            <div className="icon">
              <i className="fa-solid fa-gear" />
            </div>
            <button>Account infor</button>
            <button>
              <Link to="/setting/password" className="link-setting">
                Password
              </Link>
            </button>
          </div>
          <div className="menu-detail">
            <div className="left">
              <div className="form">
                <h2>Account infor</h2>
                <div className="input-group">
                  <span>Name</span>
                  <input type="text" placeholder="enter your name..." />
                </div>
                <div className="input-group">
                  <span>Tele</span>
                  <input type="text" placeholder="enter your phoneNumber..." />
                </div>
                <div className="input-group">
                  <span>Address</span>
                  <input type="text" placeholder="enter your address..." />
                </div>
                <div className="input-group">
                  <span>Date</span>
                  <input type="date" />
                </div>
                <button>Save</button>
              </div>
            </div>
            <div className="right">
              <img
                src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                alt=""
              />

              <button>Set avatar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
