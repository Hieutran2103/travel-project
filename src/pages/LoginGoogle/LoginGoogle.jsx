import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContextAuth } from "../../context/AuthContext";
import { set } from "react-hook-form";

export default function LoginGoogle() {
  const { setCurrentUser, setAuthenticate } = useGlobalContextAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const encodeUser = params.get("user");
    const decodeUser = decodeURIComponent(encodeUser);
    setAuthenticate(true);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setCurrentUser(localStorage.setItem("user", decodeUser));
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 500);
  }, [params, navigate]);
  return <div style={{display: "flex", justifyContent:"center", alignItems: "center", height: "100vh", fontSize: 25}}>Redirecting...</div>;
}
