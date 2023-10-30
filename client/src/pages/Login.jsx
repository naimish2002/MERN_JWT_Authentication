import React, { useEffect, useState } from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateLogin } from "../Utils/validate";
import { login } from "../Utils/fetchData";
import { useDispatch } from "react-redux";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Logging in...");
    }
  }, [isLoading]);

  //Get the data from the form, validate it and send it to the server
  const formik = useFormik({
    initialValues: {
      username: "example123",
      password: "Admin@123",
    },
    validate: validateLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      dispatch(login(values));
      setIsLoading(false);
    },
  });

  return (
    <div className="Login">
      {/* Display a toast message if there is an error with the form */}
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
          <h1>Hello Again!</h1>
        </div>
        <form
          action=""
          className="loginContainerBottom"
          onSubmit={formik.handleSubmit}
        >
          <div className="loginFormTop">
            <div className="logininputGroup">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="loginInput"
                {...formik.getFieldProps("username")}
              />
            </div>
            <div className="logininputGroup">
              <input
                type={showPass ? "password" : "text"}
                id="password"
                name="password"
                placeholder="Enter Password"
                className="loginInput"
                {...formik.getFieldProps("password")}
              />
              <span className="showPass" onClick={() => setShowPass(!showPass)}>
                {showPass ? <>Show</> : <>Hide</>}
              </span>
            </div>
            <a href="/recovery" className="loginForgotPass">
              Forgot Password?
            </a>
            <button type="submit" className="loginFormsubmitBtn">
              Login
            </button>
          </div>
          <div className="loginFormBottom">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button className="loginFormRegisterBtn">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
