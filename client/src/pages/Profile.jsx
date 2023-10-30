import React, { useEffect, useState } from "react";
import "../style/style.css";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateProfileUpdate } from "../Utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Utils/fetchData";

const Profile = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="Login">
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="container">
        <div className="loginContainerTop">
          <h1>Profile</h1>
        </div>
        <form action="" className="loginContainerBottom">
          <div className="loginFormTop">
            <div className="logininputGroup">
              <input
                type="text"
                id="email"
                name="email"
                value={auth?.user?.email}
                className="loginInput"
              />
            </div>
            <div className="logininputGroup">
              <input
                type="text"
                id="username"
                name="username"
                value={auth?.user?.username}
                className="loginInput"
              />
            </div>
          </div>
          <div className="loginFormBottom">
            <Link to="/">
              <button
                className="loginFormRegisterBtn"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
