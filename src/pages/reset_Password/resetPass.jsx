import "./resetPass.scss";
import React from "react";
import Logo from "../../assets/logonewfeed2.svg";
// import { useGlobalContextAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userSchema } from "../../utils/rules";
import InputForm from "../../components/input/inputForm";
import { Link } from "react-router-dom";
import InputPassword from "../../components/input/inputPassword";
export default function ResetPass() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const formSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="resetForm">
      <div className="container">
        <div className="item">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <div className="forget-section">
          <div className="form-box login">
            <form
              noValidate
              className="form-forget"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="icon-lock">
                <i className="bx bxs-lock"></i>
              </div>
              <h2>Reset Password</h2>

              <p>Lorem ipsum dolor sit amet consectetur, adielit.</p>
              <InputPassword
                spanName="Password"
                type="password"
                name="password"
                // placeholder="Enter your new password..."
                errormessage={errors.password?.message}
                register={{ ...register("password") }}
              />
              <InputPassword
                spanName="Confirm"
                type="password"
                name="confirm_password"
                // placeholder="Confirm your new password..."
                errormessage={errors.confirm_password?.message}
                register={{ ...register("confirm_password") }}
              />
              <button className="btn">
                <Link to="/login" className="link">
                  Reset
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
