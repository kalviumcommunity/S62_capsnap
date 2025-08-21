// services/aiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load the multimodal model (supports text + images)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCaption(imageUrl, style) {
    try {
        // Prepare image as input
        const imageParts = [
            {
                inlineData: {
                    mimeType: "image/png", // or "image/jpeg" depending on your case
                    data: Buffer.from(await fetch(imageUrl).then(r => r.arrayBuffer())).toString("base64"),
                },
            },
        ];

        // Run Gemini prompt
        const prompt = style
            ? `Generate a caption for this image in ${style} style.`
            : "Generate a simple caption for this image.";

        const result = await model.generateContent([prompt, ...imageParts]);

        const caption = result.response.text();

        return caption;
    } catch (err) {
        console.error("Error generating caption with Gemini:", err);
        return "No caption generated.";
    }
}

module.exports = { generateCaption };
