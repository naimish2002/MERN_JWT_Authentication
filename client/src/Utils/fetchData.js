import axios from "axios";

export const TYPES = {
  AUTH: "AUTH",
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//Register
export const register = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/auth/register", credentials);

    let { username, email } = credentials;

    //Send email
    if (status === 201) {
      await axios.post("/api/auth/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return { msg };
  } catch (error) {
    return { error: "Username or Email already exists" };
  }
};

//Login
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      if (username) {
        const { data } = await axios.post("/api/auth/login", {
          username,
          password,
        });

        dispatch({
          type: TYPES.AUTH,
          payload: {
            accessToken: data.accessToken,
            user: data.user,
          },
        });

        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (error) {
      return { error: "Username or Password is incorrect" };
    }
  };

//Get User Data
export const getUser = async (username) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password is incorrect" };
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("accessToken");
        await axios.post("/api/auth/logout");
        window.location.href = "/";
};