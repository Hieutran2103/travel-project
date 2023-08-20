import React, { useEffect } from "react";
import useQueryParams from "../../components/getTokenForgotPasss/queryParam";

import customFetch from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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
  return <div>Verify Forgot Password</div>;
}
