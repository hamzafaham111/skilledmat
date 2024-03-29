const express = require('express');
const router = express.Router();
const Auth = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const Post = require('../model/postSchema')
// const middleware = require('../middleware');
// const multer = require('multer');

router.post('/', async (req, res) => {
    const token = req.body.cookies.JWT;
    const { name, userName } = req.body.val;
    const { user_id } = jwt.verify(token, process.env.SECURITYKEY)
    const saved = await Auth.updateOne({ _id: user_id }, { $set: { name, userName } });
    await Post.updateMany({ user_id: user_id }, { $set: { userName: name } })
    if (saved) {
        console.log("user data updated " + saved);
    } else {
        console.log("data did not updated successfully");
    }
    res.json({ res: "data updated successfully" })
})
module.exports = router;