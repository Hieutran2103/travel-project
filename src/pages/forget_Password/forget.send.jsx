import { Link } from "react-router-dom";
import "./forget.send.scss";
import Logo from "../../assets/logonewfeed2.svg";
// import { useGlobalContextAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaEmail } from "../../utils/rules";
import InputForm from "../../components/input/inputForm";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetSend = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaEmail),
    defaultValues: {
      email: " ",
    },
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => customFetch.post("/users/forgot-password", data),
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
  });

  const formSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutate(data);
    reset();
  });

  return (
    <div className="forgetForm">
      <div className="container">
        <div className="item">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
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

              <button className="btn" type="submit">
                Send
              </button>
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
