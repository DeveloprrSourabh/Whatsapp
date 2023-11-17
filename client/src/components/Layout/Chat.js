import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSendChat } from "../../Slices/chatSlice";
import useAuth from "../../Hooks/Auth";

const host = "http://localhost:8080";
const Chat = ({ recId, recName }) => {
  const auth = useAuth();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const sendChat = useSelector((item) => {
    return item.chat.sendMessage;
  });

  // Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/chat/create-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ message, receiverId: recId }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(getSendChat());
        setMessage("");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Delete Chat
  const handleDelete = async (id) => {
    try {
      setShow("");
      const res = await fetch(`${host}/api/v1/chat/delete-chat/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        dispatch(getSendChat());
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(sendChat);
  return (
    <>
      <main className="main-chating">
        <div className="single-chat">
          <header className="masthead chat-head">
            <div className="main-header pe-5 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="header-img">
                  {localStorage.getItem("photo") ? (
                    <img
                      src={localStorage.getItem("photo")}
                      alt=""
                      className=" w-100 h-100"
                    />
                  ) : (
                    <img
                      src={`${host}/api/v1/auth/get-photo/${recId}`}
                      alt=""
                      className=" w-100 h-100"
                    />
                  )}
                </div>
                <div className="ms-3 username">
                  {" "}
                  <span className="names">
                    <i>
                      <b>{recName}</b>
                    </i>
                  </span>
                </div>
              </div>
              <div className="header-bar d-flex flex-direction-column">
                <span className="bar">•</span>
                <span className="bar">•</span>
                <span className="bar">•</span>
              </div>
            </div>
          </header>
          <div className="chat-msg">
            {sendChat?.map((c, i, arr) => {
              return (
                <div className="main-msg position-relative my-3">
                  <div
                    id={`${sendChat.length - 1 === i ? "lastele" : ""}`}
                    className="mymsg"
                  >
                    {auth.id &&
                    recId &&
                    c.receiverId._id === recId &&
                    c.senderId === auth.id ? (
                      <div className="sender text-end w-100 ms-auto">
                        <p className="m-0 unreal-msg ms-auto">
                          {c.message}
                          <sub className=" ms-2 msg-time">
                            {moment(c.createdAt).format("LT")}
                          </sub>
                          <div
                            onClick={() => {
                              show === c._id ? setShow("") : setShow(c._id);
                            }}
                            id="angleId"
                            class="myangle text-end"
                          >
                            <i class="fa-solid fa-angle-down"></i>
                          </div>
                          <sub className="ps-2 d-inline-block">✓</sub>
                        </p>
                        {show && show === c._id ? (
                          <span className="chat-option">
                            <div className="options">
                              <ul className="option-ul">
                                <li
                                  onClick={() => {
                                    handleDelete(c._id);
                                  }}
                                  className="option-list"
                                >
                                  <div className="single-option">
                                    Delete Chat
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : c.senderId === recId && c.receiverId._id === auth.id ? (
                      <>
                        <p className="m-0 real-msg ">
                          {c.message}
                          <sub className=" ms-2 msg-time">
                            {moment(c.createdAt).format("LT")}
                          </sub>
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="send-msg">
          <form onSubmit={handleSubmit}>
            <div className="msg-input justify-content-center d-flex align-items-center">
              <input
                type="text"
                name="message"
                onChange={onChange}
                value={message}
              />
              <input type="text" name="receiverId" hidden value={recId} />

              <span className="form-btn ms-2">
                <button className="">
                  <img src="/Images/send.png" alt="" className="w-100" />
                </button>
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Chat;
