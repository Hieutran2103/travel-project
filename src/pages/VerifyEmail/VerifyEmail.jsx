
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../components/getTokenForgotPasss/queryParam.jsx";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url.js";

export default function VerifyEmail() {
  const [message, setMessage] = useState("");
  const { token } = useQueryParams()
  const navigate = useNavigate()
  const VerifyEmailMutation = useMutation({
    mutationFn: (token) => customFetch.post("/users/verify-email", { email_verify_token: token}),
      onSuccess: (data) => {
        setMessage(data.data.message);
        if (data.data.result) {
          const { refresh_token, access_token } = data.data.result;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
        }
        setTimeout(() => {
            navigate('/')
        },500)  
    },
  });
  useEffect(() => {
    if (token) {
        VerifyEmailMutation.mutate(token);
    }
  }, [token]);
  return <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>{message ? message : "Please check your email for verification and to access all features of Travel."}</div>;
}
