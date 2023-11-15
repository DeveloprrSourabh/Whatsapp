import React, { useEffect, useState } from "react";

const host = "http://localhost:8080";
const useAuth = () => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let user = localStorage.getItem("auth");
    user = JSON.parse(user);
    setAuth(user);
  }, []);
  return auth;
};

export default useAuth;
