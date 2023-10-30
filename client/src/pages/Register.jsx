import React, { useEffect, useState } from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateLogin } from "../Utils/validate";
import { register } from "../Utils/fetchData";

const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //Get the data from the form, validate it and send it to the server
  const formik = useFormik({
    initialValues: {
      email: "example@gmail.com",
      username: "example123",
      password: "Admin@123",
    },
    validate: validateLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      let res = await register(values);
      if (res) {
        setIsLoading(false);
        toast.success("Registration Successful");
        window.location.href = "/";
      } else {
        toast.error("Registration Failed");
      }
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Registering...");
    }
  }, [isLoading])

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
          <h1>Register</h1>
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
                id="email"
                name="email"
                placeholder="Enter Email"
                className="loginInput"
                {...formik.getFieldProps("email")}
              />
            </div>
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
            <button type="submit" className="loginFormsubmitBtn">
              Register
            </button>
          </div>
          <div className="loginFormBottom">
            <p>Already have an account?</p>
            <Link to="/">
              <button className="loginFormRegisterBtn">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
