import { Link, useLocation } from "react-router-dom";
import "./setAvar.scss";
import { useState } from "react";
import { userSchema, userSchema2 } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";




const SetAvar =() => {
    const location = useLocation();
    console.log(location.state);
    const [isChangeAva, setIsChangeAva] = useState("");


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          old_password: "",
          password: "",
          confirm_password: "",
        },
        resolver: yupResolver(userSchema2),
      });


    return(

<>
<div className="container-setAva">
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
            <button>
            <Link to="/setting/password" className="link-setting">
            Password
              </Link>
            </button>
            <button>
              <Link to="/setting/setavar" className="link-setting">
                Avatar
              </Link>
            </button>
          </div>
          <div className="menu-detail">
            <div className="form">
              <form>
                <h2>Your avatar</h2>
              </form>
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




    )

    }



export default SetAvar;





