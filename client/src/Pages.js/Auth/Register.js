import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";

const host = "http://localhost:8080";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //  Register User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.getItem("token") ? navigate("/") : <></>;
  }, []);
  return (
    <Layout>
      <div id="register-form">
        <form className="register" onSubmit={handleSubmit}>
          <div className="create-heading d-flex justify-content-between">
            <h2 className="create-account">Create an Account</h2>
          </div>
          <div className="register-input">
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={credentials.name}
              placeholder="Name*"
            />
          </div>
          <div className="register-input">
            <input
              onChange={onChange}
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Email*"
            />
          </div>
          <div className="register-input">
            <input
              onChange={onChange}
              type="password"
              value={credentials.password}
              name="password"
              id=""
              placeholder="Password*"
            />
          </div>

          <button className="register-btn">Create an Account</button>
          <div className="have-account">
            <span>Have an account?</span>
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
