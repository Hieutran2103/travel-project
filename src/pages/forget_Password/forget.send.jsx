import { Link, useNavigate } from "react-router-dom";
import "./forget.send.scss";
import Logo from "../../assets/logonewfeed2.svg";
// import { useGlobalContextAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema, schemaEmail } from "../../utils/rules";
import InputForm from "../../components/input/inputForm";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { omit } from "lodash";
import customFetch from "../../utils/url";

// const schemaEmail = omit(schema, ['password', 'confirm_password', 'username'])

const ForgetSend = () => {
  const navigate = useNavigate()
  //   const { login } = useGlobalContextAuth();
  // const fetchApi = async () => {
  //   const response = await axios.get(
  //     ``
  //   );
  //   setForgetToken(response.data)
  // };

  // const [forgetToken,setForgetToken] = useState([]);
  // const query = useQuery([`posts`, fetchApi]);
  // console.log('query', query);

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaEmail),
    defaultValues: {
      email: " ",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => customFetch.post("/users/forgot-password", data),
    onSuccess: (data) => {
      alert(data.data.message)
    }
  })

  const formSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutate(data)
  });
  return (
    <div className="forgetForm">
      <div className="container">
        <div className="item">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          {/* <div className="text-item">
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
          </div> */}
        </div>
        <div className="forget-section">
          <div className="form-box login">
            <form noValidate className="form-forget" onSubmit={formSubmit}>
              <div className="icon-lock">
                <i className="bx bxs-lock"></i>
              </div>
              <h2>Forget Password</h2>

              <p>Type your email that you forget the password</p>
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
              <button className="btn">Send</button>
            </form>

            <div className="create-account">
              <Link to="/register">
                <p>Create A New Account</p>
              </Link>
            </div>
            <div className="border-line">
              <hr />
            </div>

            <button className="backLogin">
              <Link to="/login" className="link">
                Back to login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetSend;
