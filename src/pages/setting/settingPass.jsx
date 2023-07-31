import { Link } from "react-router-dom";
import "./settingPass.scss";
const SettingPass = () => {
  return (
    <>
      <div className="container-set-pass">
        <h1>Settings</h1>
        <div className="form-box">
          <div className="nav">
            <div className="icon">
              <i className="fa-solid fa-gear" />
            </div>
            <button>
              <Link to="/setting/account" className="link-setting">
                Account infor
              </Link>
            </button>
            <button>Password</button>
          </div>
          <div className="menu-detail">
            <div className="form">
              <h2>Password</h2>
              <div className="input-group">
                <span>Old Password</span>
                <input type="text" placeholder="enter your old passowrd..." />
              </div>
              <div className="input-group">
                <span>New Password</span>
                <input type="text" placeholder="enter your new password..." />
              </div>
              <div className="input-group">
                <span>Confirm</span>
                <input type="text" placeholder="confirm your new password..." />
              </div>
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPass;
