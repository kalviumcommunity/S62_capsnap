const express = require("express");
const router = express.Router();
const { getCaption } = require("../controllers/captionController");

router.post("/generate", getCaption);

module.exports = router;
