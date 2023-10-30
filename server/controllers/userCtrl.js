const Users = require("../models/user");
const bcrypt = require("bcrypt");

const userCtrl = {
  /** GET: http://localhost:8001/api/user/:username */
  getUser: async (req, res) => {
    const { username } = req.params;

    try {
      if (!username) return res.status(400).send("Username not found");

      const user = await Users.findOne({ username });

      //Remove password from user object
      const { password, ...rest } = user._doc;
      if (user) {
        return res.status(200).send(rest);
      }
    } catch (error) {
      return res.status(404).send("Cannot find user");
    }
  },
};

module.exports = userCtrl;
