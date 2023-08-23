import React, { useEffect } from "react";
import useQueryParams from "../../components/getTokenForgotPasss/queryParam";
import "./VerifyForgotPassword.scss";
import customFetch from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Logo from "../../assets/logonewfeed2.svg";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';




export default function VerifyForgotPassword() {

  
  const { token } = useQueryParams();
  console.log(token)
  const navigate = useNavigate();
  const VerifyTokenMutation = useMutation({
    mutationFn: (token) => customFetch.post("/users/verify-forgot-password", {forgot_password_token: token}),
      onSuccess: () => {
     

      navigate("/reset-password", {
        state: { forgot_password_token: token },
      });
    },
  });
 
  useEffect(() => {
    // const controller = new AbortController()
    if (token) {
      VerifyTokenMutation.mutate(token);
    }
  },[token]);

  
  return <div>
    <div className="VerifyEMAIL">

      <div className="verifie-main">
      <h1>Verify email success 

        <AlarmOnIcon className="icon-alert"/>
      </h1>
      <img className="logotot" src={Logo} alt="logo" />
      <p>Look like you have succcess on this verify email</p>
      </div>
    </div>
  </div>;
}
