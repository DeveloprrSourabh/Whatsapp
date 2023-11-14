import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../Slices/userSlice";
import { getSendChat } from "../Slices/chatSlice";
import moment from "moment";
import Chat from "../components/Layout/Chat";
const host = "http://localhost:8080";

const Home = () => {
  const dispatch = useDispatch();
  const [recId, setRecId] = useState("");
  const [user, setUser] = useState([]);
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
    getUser();
  }, []);
  const alluser = useSelector((data) => {
    return data.user.allUser;
  });

  return (
    <Layout>
      <div className="home-page">
        <div className="row">
          <div className="col-sm-5 pe-0">
            <header className="masthead">
              <div className="main-header d-flex align-items-center justify-content-between">
                <div className="header-img">
                  <img
                    className="w-100 h-100"
                    src="/Images/pexels-photo-220453.webp"
                    alt=""
                  />
                </div>
                <div className="header-bar d-flex flex-direction-column">
                  <span className="bar">•</span>
                  <span className="bar">•</span>
                  <span className="bar">•</span>
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
                          className="all-users-box col-sm-12 d-flex "
                          onClick={() => {
                            dispatch(getSendChat(u._id));
                            setRecId(u._id);
                          }}
                        >
                          <div className="header-img-second">
                            <img
                              src="/Images/pexels-photo-220453.webp"
                              alt=""
                              className="w-100 h-100 pb-3"
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
            <Chat recId={recId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
