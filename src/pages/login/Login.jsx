import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import Logo from "../../assets/logonewfeed2.svg";
import { useGlobalContextAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema, schemaEmail } from "../../utils/rules";
import InputForm from "../../components/input/inputForm";
import { useMutation } from "@tanstack/react-query";
// import {t} from "react-i18next";
import customFetch from "../../utils/url";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setAuthenticate } = useGlobalContextAuth();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [t, i18] = useTranslation("global");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(schemaEmail),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: (data) => customFetch.post("/users/login", data),
    onSuccess: (data) => {
      setCurrentUser(
        localStorage.setItem("user", JSON.stringify(data.data.data.user))
      );
      localStorage.setItem("access_token", data.data.data.access_token);
      localStorage.setItem("refresh_token", data.data.data.refresh_token);
      setAuthenticate(true);
      toast.success(t("auth.Login"));
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 500);
    },
    onError: (error) => {
      if(error.response.status === 422){
        const formError = error.response?.data.errors;
        if (formError?.email) {
          setError('password', {
            message: formError.email.msg,
            type: 'Server'
          })
        }
      }
    }
  });
  const formSubmit = (data) => {
    loginMutation.mutate(data);
  };

  const getGoogleAuthUrl = () => {
    const {VITE_GOOGLE_CLIENT_ID, VITE_REDIRECT_URI} = import.meta.env
    const url = `https://accounts.google.com/o/oauth2/auth`
    const query = {
        client_id: VITE_GOOGLE_CLIENT_ID,
        redirect_uri: VITE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' '),
        prompt: 'consent',
        access_type: 'offline'
    }
    const queryString = new URLSearchParams(query).toString()
    return `${url}?${queryString}`
}

const googleOAuthUrl = getGoogleAuthUrl()

  return (
    <div className="loginForm">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <div className="item">
          <div className="logo">
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
                <i className="bx bxl-facebook" id="facebook" />
              </a>
              <a href="#">
                <i className="bx bxl-google" id="google" />
              </a>
              <a href="#">
                <i className="bx bxl-instagram" id="ig" />
              </a>
              <a href="#">
                <i className="bx bxl-linkedin" id="linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div className="login-section">
          <div className="form-box login">
            <form
              noValidate
              className="form-login"
              onSubmit={handleSubmit(formSubmit)}
            >
              <h2>Sign In</h2>
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
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
              </div>

              <button className="btn" type="submit">
                Login
              </button>
              <div className="or">
                <p>OR</p>
              </div>
            </form>

            <Link className="btnGG" to={googleOAuthUrl}>
              Login With Google <i className="bx bxl-google" />
            </Link>
            <div className="remember-password">
              <Link to="/user-forgot-password" className="forgot-pass">
                {" "}
                Forget password?
              </Link>
            </div>
            <div className="create-account">
              <p>
                Create A New Account?{" "}
                <Link to="/register" className="register-link">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
