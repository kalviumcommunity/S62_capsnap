const { generateCaption } = require("../services/openaiService");

const getCaption = async (req, res) => {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: "Image URL is required." });
    }

    try {
        const caption = await generateCaption(imageUrl, style);
        res.json({ caption });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCaption };
