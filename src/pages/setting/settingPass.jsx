import { Link, useLocation } from "react-router-dom";
import "./settingPass.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/input/inputPassword";
import { userSchema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { toast } from "react-toastify";
import { useState } from "react";

// const scheme = yup.object({
//   old_password: yup
//     .string()
//     .required("old_password is required")
//     .min(5, "Do dai ky tu 5-15")
//     .max(15, "Do dai ky tu 5-15"),
//   password: yup
//     .string()
//     .required("password is required")
//     .min(5, "Do dai ky tu 5-15")
//     .max(15, "Do dai ky tu 5-15"),
//   confirm_password: yup
//     .string()
//     .required("confirm_password is required lew")
//     .min(5, "Do dai ky tu 5-15")
//     .max(15, "Do dai ky tu 5-15")
//     .oneOf([yup.ref("password")], "nhap lai mk chua khop"),
// });
const SettingPass = () => {
  const location = useLocation();
  console.log(location.state);
  const [isShowPassword, setIsShowPassword] = useState("");

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
    resolver: yupResolver(userSchema),
  });
  const settingPassword = useMutation({
    mutationFn: (data) =>
      customFetch.put("/users/change-password", {
        old_password: data.old_password,
        new_password: data.password,
        confirm_new_password: data.confirm_password,
      }),
    onSuccess: (data) => {
      console.log(data);
      alert(data.data.message);
    },
  });
  const formSubmit = (data) => {
    settingPassword.mutate(data);
  };
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
              <form noValidate onSubmit={handleSubmit(formSubmit)}>
                <h2>Password</h2>
                <div className="input1">
                  <InputPassword
                    spanName="Old Password"
                    type={isShowPassword === true ? "text" : "password"}
                    name="old_password"
                    placeholder="Enter your old password..."
                    errormessage={errors.old_password?.message}
                    register={{ ...register("old_password") }}
                  />
                  <i
                    className={
                      isShowPassword === true
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
                </div>

                {/* <div className="input-group">
                <span>New Password</span>
                <input type="text" placeholder="enter your new password..." />
              </div> */}
                <div className="input1">
                  <InputPassword
                    spanName="Password"
                    type={isShowPassword === true ? "text" : "password"}
                    name="password"
                    placeholder="Enter your new password..."
                    errormessage={errors.password?.message}
                    register={{ ...register("password") }}
                  />
                  <i
                    className={
                      isShowPassword === true
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
                </div>

                {/* <div className="input-group">
                  <span>Confirm</span>
                  <input
                    type="text"
                    placeholder="confirm your new password..."
                  />
                </div> */}
                <div className="input1">
                  <InputPassword
                    spanName="Confirm"
                    type={isShowPassword === true ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm your new password..."
                    errormessage={errors.confirm_password?.message}
                    register={{ ...register("confirm_password") }}
                  />
                  <i
                    className={
                      isShowPassword === true
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
                </div>

                <button>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPass;
