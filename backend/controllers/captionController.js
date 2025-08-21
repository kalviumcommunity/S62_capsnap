// controllers/captionController.js
const { generateCaption } = require("../services/aiService");

const getCaption = async (req, res) => {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: "Image URL is required." });
    }

    try {
        const caption = await generateCaption(imageUrl, style);
        res.json({ caption });
    } catch (error) {
        console.error("Error in getCaption:", error);
        res.status(500).json({ error: error.message || "An error occurred while generating the caption." });
    }
};

module.exports = { getCaption };
