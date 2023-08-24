import { Link, useLocation } from "react-router-dom";
import "./settingPass.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/input/inputPassword";
import { userSchema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";

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
      customFetch.post("/users/setting/password", {
        old_password: data.password,
        password: data.password,
        confirm_password: data.confirm_password,
        // forgot_password_token: location.state.forgot_password_token,
        // hoi Thang token setting Password
      }),
    onSuccess: (data) => {
      console.log(data);
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
                <InputPassword
                  spanName="Old Password"
                  type="password"
                  name="old_password"
                  placeholder="Enter your old password..."
                  errormessage={errors.old_password?.message}
                  register={{ ...register("old_password") }}
                />
                {/* <div className="input-group">
                <span>New Password</span>
                <input type="text" placeholder="enter your new password..." />
              </div> */}
                <InputPassword
                  spanName="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your new password..."
                  errormessage={errors.password?.message}
                  register={{ ...register("password") }}
                />
                {/* <div className="input-group">
                  <span>Confirm</span>
                  <input
                    type="text"
                    placeholder="confirm your new password..."
                  />
                </div> */}
                <InputPassword
                  spanName="Confirm"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm your new password..."
                  errormessage={errors.confirm_password?.message}
                  register={{ ...register("confirm_password") }}
                />
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
