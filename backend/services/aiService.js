const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load the multimodal model (supports text + images)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCaption(imageUrl, style) {
    try {
        const imageBuffer = await fetch(imageUrl).then(r => r.arrayBuffer());
        const imageParts = [
            {
                inlineData: {
                    mimeType: "image/png", // change to "image/jpeg" if needed
                    data: Buffer.from(imageBuffer).toString("base64"),
                },
            },
        ];

        // Run Gemini prompt and also structure the output as JSON
        const prompt = style
            ? `Generate exactly 5 captions for this image in a ${style} style. 
               Return the output ONLY as a JSON object in this format:
               { "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"] }`
            : `Generate exactly 5 captions for this image. 
               Return the output ONLY as a JSON object in this format:
               { "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"] }`;

        const result = await model.generateContent([prompt, ...imageParts]);

        let text = result.response.text();

        //  Clean Gemini's output if it contains code fences like ```json ... ```
        text = text
            .replace(/```json/gi, '') // remove ```json
            .replace(/```/g, '')       // remove ```
            .trim();                   // remove leading/trailing spaces

        // Try parsing into JSON
        let captions;
        try {
            captions = JSON.parse(text);
        } catch (err) {
            console.error("Error parsing AI response as JSON:", err);
            return { captions: [] }; // fallback
        }


        return captions;
    } catch (err) {
        console.error("Error generating caption with Gemini:", err);
        return { captions: [] };
    }
}

module.exports = { generateCaption };
