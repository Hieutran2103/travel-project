import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import Logo from "../../assets/logonewfeed2.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/rules";
import InputForm from "../../components/input/inputForm";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { useState } from "react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerMutation = useMutation({
    mutationFn: (data) => customFetch.post("/users/register", data),
    onSuccess: (data) => {
      console.log(data);
      alert(data.data.message);
      localStorage.setItem("profile", JSON.stringify(data.data.user));
      navigate("/");
    },
  });

  const formSubmit = (data) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="item">
          <div className="logo">
            {/* <i className="bx bxl-xing" /> */}
            <img src={Logo} alt="logo" />
          </div>
          <div className="text-item">
            <h2>
              Welcome! <br />
              <span>To Our Web</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              repellendus?
            </p>
            <div className="social-icon">
              <a href="#">
                <i className="bx bxl-facebook" />
              </a>
              <a href="#">
                <i className="bx bxl-google" />
              </a>
              <a href="#">
                <i className="bx bxl-instagram" />
              </a>
              <a href="#">
                <i className="bx bxl-linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div className="login-section">
          <div className="form-box register">
            <form noValidate onSubmit={handleSubmit(formSubmit)}>
              <h2>Sign Up</h2>
              <InputForm
                // className="input-box"
                classNameicon="icon"
                classNameI="bx bxs-user"
                name="name"
                labelName="Username"
                type="text"
                classNameLabel="label"
                errormessage={errors.username?.message}
                register={{ ...register("name") }}
              />
              <InputForm
                // className="input-box"
                classNameicon="icon"
                classNameI="bx bxs-envelope"
                name="email"
                labelName="Email"
                type="email"
                classNameLabel="label"
                errormessage={errors.email?.message}
                register={{ ...register("email") }}
              />

              <div className="input2">
                <InputForm
                  // className="input-box"
                  // classNameicon="icon"
                  // classNameI="bx bxs-lock"
                  name="password"
                  labelName="Password"
                  type={isShowPassword === true ? "text" : "password"}
                  classNameLabel="label"
                  errormessage={errors.password?.message}
                  register={{ ...register("password") }}
                />
                <i
                  className={
                    isShowPassword === true
                      ? "fa-solid fa-lock-open"
                      : "fa-solid fa-lock"
                  }
                  onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
              </div>

              <div className="input3">
                <InputForm
                  // className="input-box"
                  // classNameicon="icon"
                  // classNameI="bx bxs-lock"
                  name="confirm_password"
                  labelName="Confirm Password"
                  type={isShowPassword === true ? "text" : "password"}
                  classNameLabel="label"
                  errormessage={errors.confirm_password?.message}
                  register={{ ...register("confirm_password") }}
                />
                <i
                  className={
                    isShowPassword === true
                      ? "fa-solid fa-lock-open"
                      : "fa-solid fa-lock"
                  }
                  onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
              </div>

              <button className="btn">Sign Up</button>
              <div className="or">
                <p>OR</p>
              </div>

              <button className="btn">
                Sign Up With Google <i className="bx bxl-google" />
              </button>

              <div className="create-account">
                <p>
                  Already Have An Account?{" "}
                  <Link to="/login" className="login-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
