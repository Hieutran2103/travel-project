import { Link } from "react-router-dom";
import "./login.scss";
import { useGlobalContextAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useGlobalContextAuth();
  return (
    <div className="login">
      <Link to={"/"}>
        <button onClick={login}>Login</button>
      </Link>
      <Link to="/register"> Register</Link>
    </div>
  );
};

export default Login;
