const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const authCtrl = {
  /** POST: http://localhost:8001/api/auth/register
   * @param: {
   * "username": "example123",
   * "email": "example@gmail.com",
   * "password": "Admin@123"
   * "profilePicture": "https://socialmedia-p.s3.ap-south-1.amazonaws.com/profilePicture/1682080833010naruto3.jpg"
   * }
   */
  register: async (req, res) => {
    try {
      const { profilePicture, email, username, password } = req.body;

      //Check if user already exists
      const userExists = await Users.findOne({ username });
      if (userExists)
        return res.status(400).json({ msg: "Username already exists" });

      //Check if email already exists
      const emailExists = await Users.findOne({ email });
      if (emailExists)
        return res.status(400).json({ msg: "Email already exists" });

      //Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create new user
      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
      });

      //Save user to database
      const user = await newUser.save();

      return res.status(201).send({ msg: "User created successfully", user });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },

  /** POST: http://localhost:8001/api/auth/login
   * @param: {
   * "username": "example123",
   * "password": "Admin@123"
   * }
   */
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const userExists = await Users.findOne({ username });
      if (!userExists)
        return res.status(400).json({ msg: "User does not exists" });

      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const accessToken = createAccessToken({ id: userExists._id });

      return res.status(200).send({
        msg: "Login successful",
        accessToken,
        user: userExists,
      });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },

  verifyUser: async (req, res, next) => {
    try {
      const { username } = req.method === "POST" ? req.body : req.query;

      //check user exists
      const userExists = await Users.findOne({ username });
      if (!userExists)
        return res.status(404).send({ error: "User does not exists" });
      next();
    } catch (error) {
      return res.status(404).send({ error: "Authentication Error" });
    }
  },

  authenticate: async (req, res) => {
    res.end();
  },

  //Redirect user when OTP is valid
  /**GET: http://localhost:8001/api/auth/createResetSession */
  createResetSession: async (req, res) => {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false; //allow access to this route only once
      return res.status(201).send({ msg: "Access Granted" });
    }

    return res.status(440).send({ error: "Session Expired" });
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/auth/refresh_token' });
      res.status(200).json({ msg: "Logged out successfully.!!" });
  } catch (error) {
      return res.status(500).json({ msg: error.message });
  }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

module.exports = authCtrl;
