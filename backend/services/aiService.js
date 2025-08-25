const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load multimodal model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Actual function: Generate captions for an image
 */
async function generateCaption(imageUrl, style) {
    try {
        const imageBuffer = await fetch(imageUrl).then(r => r.arrayBuffer());
        const imageParts = [
            {
                inlineData: {
                    mimeType: "image/jpeg", // safer default
                    data: Buffer.from(imageBuffer).toString("base64"),
                },
            },
        ];

        // Build prompt
        // using zero-shot prompting here
        // zero-shot: no examples, just instructions
        const prompt = style
            ? `Generate exactly 5 captions for this image in a ${style} style. 
         Return only a JSON object in this format:
         { "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"] }`
            : `Generate exactly 5 captions for this image. 
         Return only a JSON object in this format:
         { "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"] }`;

        // Call Gemini with image + prompt
        const result = await model.generateContent([prompt, ...imageParts]);

        let text = result.response.text();

        // Clean output (remove ```json ``` fences if present)
        text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

        let captions;
        try {
            captions = JSON.parse(text);
        } catch (err) {
            console.error("Error parsing AI response as JSON:", err);
            return { captions: [] };
        }

        return captions;
    } catch (err) {
        console.error("Error generating caption with Gemini:", err);
        return { captions: [] };
    }
}

/**
 * Function-calling wrapper
 */
async function handleUserRequest(userMessage) {
    // 1. Declare functions Gemini can call
    const tools = [
        {
            functionDeclarations: [
                {
                    name: "generateCaption",
                    description: "Generate captions for an image",
                    parameters: {
                        type: "object",
                        properties: {
                            imageUrl: {
                                type: "string",
                                description: "The URL of the image",
                            },
                            style: {
                                type: "string",
                                description: "Style of captions (funny, professional, poetic, etc.)",
                            },
                        },
                        required: ["imageUrl"],
                    },
                },
            ],
        },
    ];

    // 2. Send user message to Gemini with function calling enabled
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        tools,
        toolConfig: {
            functionCallingConfig: { mode: "ANY" }, // allow Gemini to pick function
        },
    });

    // 3. Check if Gemini wants to call a function
    const candidates = result.response.candidates || [];
    if (candidates.length > 0) {
        const parts = candidates[0].content.parts;

        for (const part of parts) {
            if (part.functionCall) {
                const { name, args } = part.functionCall;
                if (name === "generateCaption") {
                    // Execute the actual function
                    return await generateCaption(args.imageUrl, args.style);
                }
            }
        }
    }

    // 4. If Gemini didn’t call function → fallback
    return { captions: [] };
}

module.exports = { generateCaption, handleUserRequest };
