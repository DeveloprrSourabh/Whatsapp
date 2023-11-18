import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../Slices/userSlice";
import { getSendChat } from "../Slices/chatSlice";
import moment from "moment";
import Chat from "../components/Layout/Chat";
import Profile from "./Profile";
import { redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const host = "http://localhost:8080";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recId, setRecId] = useState("");
  const [recName, setRecName] = useState("");
  const [myimage, setMyimage] = useState("");
  const [user, setUser] = useState([]);

  const [side, setSide] = useState(false);
  const data = useSelector((data) => {
    return data.user.loginData;
  });

  // Get User
  const getUser = async () => {
    try {
      dispatch(getAllUser());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.getItem("token") ? <></> : redirect("/login");
  }, []);
  useEffect(() => {
    getUser();
  }, [side, setSide]);
  const alluser = useSelector((data) => {
    return data.user.allUser;
  });
  let myname = localStorage.getItem("auth");
  myname = JSON.parse(myname);
  let firstname = myname.name;
  let id = myname.id;
  let online = myname.online;
  const getPic = async () => {
    const data = await fetch(`${host}/api/v1/auth/get-photo/${id}`, {
      method: "GET",
    });
    setMyimage(data.url);
  };
  useEffect(() => {
    getPic();
  }, []);
  window.onload = () => {
    localStorage.removeItem("photo");
  };
  useEffect(() => {
    dispatch(getSendChat());
  }, []);

  // Logout User
  const logout = async (id) => {
    try {
      const res = await fetch(`${host}/api/v1/auth/logout/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="home-page">
        <div className="row">
          <Profile side={side} setSide={setSide} />
          <div className="col-sm-5 pe-0">
            <header className="masthead">
              <div className="main-header d-flex align-items-center justify-content-between">
                <div className="header-img" onClick={() => setSide(true)}>
                  {localStorage.getItem("photo") ? (
                    <img
                      src={localStorage.getItem("photo")}
                      alt=""
                      className=" w-100 h-100"
                    />
                  ) : (
                    <img
                      src={`${host}/api/v1/auth/get-photo/${id}`}
                      alt=""
                      className=" w-100 h-100"
                    />
                  )}
                </div>
                <div className="header-bar d-flex flex-direction-column">
                  {localStorage.getItem("token") ? (
                    <span
                      onClick={() => {
                        logout(id);
                      }}
                      className="bar"
                    >
                      Logout
                    </span>
                  ) : (
                    <>
                      <span className="bar">•</span>
                      <span className="bar">•</span>
                      <span className="bar">•</span>
                    </>
                  )}
                </div>
              </div>
            </header>
            <section className="all-user">
              <div className="main-user">
                <div className="row">
                  {alluser?.map((u) => {
                    return (
                      <>
                        <div
                          className={`all-users-box col-sm-12 d-flex ${
                            u._id === recId ? "active" : ""
                          }`}
                          onClick={() => {
                            setRecId(u._id);
                            setRecName(u.name);
                            dispatch(getSendChat());
                          }}
                        >
                          <div className="header-img-second">
                            <img
                              src={`${host}/api/v1/auth/get-photo/${u._id}`}
                              alt=""
                              className=" w-100 h-100 pb-3"
                            />
                          </div>
                          <div className="line d-flex justify-content-between align-items-center w-100">
                            <div className="user-bio">
                              <h2 className="number m-0">{u.name}</h2>
                              <p className="m-0 usermesage">Hi</p>
                            </div>
                            <div className="time ms-auto">
                              <p className="usermesage-sec m-0">
                                {moment(u.createdAt).fromNow()}
                              </p>
                              <div className="myangle text-end">
                                <i class="fa-solid fa-angle-down"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
          <div className="col-sm-7 second-chat p-0">
            {recId !== "" ? (
              <Chat online={alluser} recName={recName} recId={recId} />
            ) : (
              <>
                <div className="nothing">
                  <div className="nothing-img w-50 mx-auto">
                    <img src="/Images/download.png" alt="" className="w-100" />
                  </div>
                  <div className="text-center my-3 nothing-cation">
                    <h2>Nothing to Show!</h2>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
