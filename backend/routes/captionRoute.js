const express = require("express");
const router = express.Router();
// const { getCaption } = require("../controllers/captionController");

const { handleUserRequest } = require("../services/aiService");

router.post("/generate", async (req, res) => {
    const { message } = req.body;

    const result = await handleUserRequest(message);

    res.json(result);
});

module.exports = router;