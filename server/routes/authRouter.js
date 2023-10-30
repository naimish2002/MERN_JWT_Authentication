const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const localVariable = require("../middleware/auth");
// const registerMail = require("../controllers/mailer");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/authenticate", authCtrl.verifyUser, authCtrl.authenticate);

router.get("/logout", authCtrl.logout);

module.exports = router;
