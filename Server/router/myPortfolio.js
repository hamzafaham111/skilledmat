const express = require('express');
const router = express.Router();
const Auth = require('../model/userSchema');
const Portfolio = require('../model/portfolioSchema');
const jwt = require('jsonwebtoken')
const middleware = require('../middleware');
const multer = require('multer');

router.get('/', async (req, res) => {
    const token = req.headers.token;

    const { user_id } = jwt.verify(token, process.env.SECURITYKEY)
    const userInfo = await Portfolio.findOne({ portfolio_id: user_id })
    if (userInfo) {
        res.status(200).json({ message: userInfo })
        return;
    }
    else {
        res.status(500).json({ error: "portfolio not found" });
        return;
    }

})

module.exports = router;