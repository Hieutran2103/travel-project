import "./resetPass.scss";
import React from "react";
import Logo from "../../assets/logonewfeed2.svg";
// import { useGlobalContextAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, userSchema } from "../../utils/rules";
// import InputForm from "../../components/input/inputForm";
import { Link, useLocation } from "react-router-dom";
import InputPassword from "../../components/input/inputPassword";
import { omit } from "lodash";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { toast } from "react-toastify";
export default function ResetPass() {
  const location = useLocation()
  // console.log(location.state)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(resetPasswordSchema), defaultValues:{
    password: " ",
    confirm_password:" "
  } });


  const resetPasswordMutation = useMutation({
    mutationFn: (data) => customFetch.post("/users/reset-password", {
      password: data.password,
      confirm_password: data.confirm_password,
      forgot_password_token: location.state.forgot_password_token
    }),
    onSuccess: (data) => {
      toast.success(t("auth.Login"));
    }
  })

  const formSubmit = (data) => {
    resetPasswordMutation.mutate(data)
    reset()
    
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
              <button className="btn" type="submit">          
                  Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
