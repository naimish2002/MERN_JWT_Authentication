const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" });

            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const localVariable = async (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next();
};

module.exports = auth;
module.exports = localVariable;
