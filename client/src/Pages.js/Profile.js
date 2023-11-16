import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const host = "http://localhost:8080";

const Profile = ({ side, setSide }) => {
  let myname = localStorage.getItem("auth");
  myname = JSON.parse(myname);
  let firstname = myname.name;
  let id = myname.id;
  const [names, setNames] = useState(firstname);
  const [photo, setPhoto] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await fetch(`${host}/api/v1/auth/update-profile/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ names }),
      });
      const data = await res.json();
      if (data.success) {
        let user = localStorage.getItem("auth");
        user = JSON.parse(user);
        user.name = names;
        localStorage.setItem("auth", JSON.stringify(user));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Photo Update
  const handlePhoto = async (e) => {
    e.preventDefault();
    try {
      const photoData = new FormData();
      photo && photoData.append("photo", photo);
      const { data } = await axios.post(
        `${host}/api/v1/auth/update-photo/${id}`,
        photoData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (data.success) {
        localStorage.setItem("photo", URL.createObjectURL(photo));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`profile-page col-sm-5 px-0 ${side ? "active" : ""}`}>
        <header className="profile-header">
          <div className="headers-content">
            <h2>
              <i
                onClick={() => setSide(false)}
                className="me-3 fa-solid fa-angle-left"
              ></i>{" "}
              Profile
            </h2>
          </div>
        </header>
        <div className="img-section d-flex justify-content-center ">
          <div className="my-4 img-hover">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
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
          <form className="change-profile-photo" onSubmit={handlePhoto}>
            <label htmlFor="photo">
              <input
                hidden
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  setTimeout(() => {
                    document.getElementById("photoForm").click();
                  }, 1000);
                }}
                type="file"
                id="photo"
              />
              <h2>
                Change
                <br /> Profile Photo
              </h2>
            </label>
            <button className="d-none hidden" id="photoForm">
              upload
            </button>
          </form>
        </div>
        <div className="profile-name">
          <form onSubmit={handleSubmit}>
            <div className="form-input px-3 d-flex align-items-center justify-content-center">
              <input
                onChange={(e) => setNames(e.target.value)}
                type="text"
                value={names}
                className={`name-input ${show ? "active" : ""}`}
                name="name"
              />
              {show ? (
                <div className="pen text-end px-3">
                  <button type="submit" className="btn btn-primary">
                    Save Change
                  </button>
                </div>
              ) : (
                <div className="d-flex pen w-100 align-items-center justify-content-between px-3">
                  <p className="main-name">{names}</p>
                  <h2 className="btn btn-primary" onClick={() => setShow(true)}>
                    Change
                  </h2>
                </div>
              )}
            </div>
          </form>
        </div>
        <p className="name-desc ">
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
      </div>
    </>
  );
};

export default Profile;
