import toast from "react-hot-toast";

//Validate username
function validateUsername(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is required");
  } else if (values.username.length < 3) {
    error.username = toast.error("Username must be at least 3 characters");
  } else if (values.username.length > 20) {
    error.username = toast.error("Username must be less than 20 characters");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Username cannot contain spaces");
  }
  return error;
}

//Validate password
function validatePassword(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password is required");
  } else if (values.password.length < 6) {
    error.password = toast.error("Password must be at least 6 characters");
  } else if (values.password.length >= 12) {
    error.password = toast.error(
      "Password must be less than or equals to 12 characters"
    );
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password cannot contain spaces");
  } else if (!/[a-z]/.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least 1 lowercase letter"
    );
  } else if (!/[A-Z]/.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least 1 uppercase letter"
    );
  } else if (!/[0-9]/.test(values.password)) {
    error.password = toast.error("Password must contain at least 1 number");
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least 1 special character"
    );
  }
  return error;
}

//Validate email
function validateEmail(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    error.email = toast.error("Email is invalid");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Email cannot contain spaces");
  } else if (!values.email.includes("@")) {
    error.email = toast.error("Email must contain @");
  } else if (!values.email.includes(".")) {
    error.email = toast.error("Email must contain .");
  } else if (values.email.indexOf("@") > values.email.lastIndexOf(".")) {
    error.email = toast.error("Email is invalid");
  }
  return error;
}

//Validate OTP number
function validateOtpNumber(error = {}, values) {
  if (!values.otpNumber) {
    error.otpNumber = toast.error("OTP is required");
  } else if (values.otpNumber.toString().length !== 6) {
    error.otpNumber = toast.error("OTP must be 6 digits");
  }
  return error;
}

let error = {};
//Validate username and password for login
export async function validateLogin(values) {
  error = validateUsername({}, values);
  error = validatePassword({}, values);
  return error;
}

//Validate username, email and password for register
export function validateRegister(values) {
  error = validateUsername({}, values);
  error = validateEmail({}, values);
  error = validatePassword({}, values);
  return error;
}

//Validate email for recovery
export function validateRecovery(values) {
  error = validateUsername({}, values);
  return error;
}

//Validate OTP for OTP verification
export function validateOtp(values) {
  error = validateOtpNumber({}, values);
  return error;
}

//Validate Reset password
export function validateReset(values) {
  const error = validatePassword({}, values);

  if(values.password !== values.confirmPassword) {
    error.confirmPassword = toast.error("Passwords do not match");
  }

  return error;
}

//Validate Update profile
export function validateProfileUpdate(values) {
  error = validateEmail({}, values);
  return error;
}
