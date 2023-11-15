import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSendChat } from "../../Slices/chatSlice";
import useAuth from "../../Hooks/Auth";

const host = "http://localhost:8080";
const Chat = ({ recId }) => {
  const auth = useAuth();
  const [message, setMessage] = useState("");
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

  return (
    <>
      <main className="main-chating">
        <div className="single-chat">
          <header className="masthead chat-head">
            <div className="main-header pe-5 d-flex align-items-center justify-content-between">
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
          <div className="chat-msg">
            {sendChat?.map((c, i, arr) => {
              return (
                <div className="main-msg my-3">
                  <div
                    id={`${sendChat.length - 1 === i ? "lastele" : ""}`}
                    className="mymsg"
                  >
                    {auth.id &&
                    recId &&
                    c.senderId === auth.id &&
                    c.receiverId === recId ? (
                      <div className="sender w-100 ms-auto">
                        <p className="m-0 unreal-msg ms-auto">
                          {c.message}
                          <sub className=" ms-2 msg-time">
                            {moment(c.createdAt).format("LT")}
                          </sub>
                        </p>
                      </div>
                    ) : c.senderId !== auth.id && c.receiverId !== recId ? (
                      <p className="m-0 real-msg ">
                        {c.message}
                        <sub className=" ms-2 msg-time">
                          {moment(c.createdAt).format("LT")}
                        </sub>
                      </p>
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
