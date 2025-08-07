const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateCaption = async (imageUrl, style) => {
    const systemPrompt = `
You are CapSnap, an AI image captioning assistant.

Your job is to look at the uploaded photo and generate a short, creative caption that matches the given style.

Available caption styles include:
- Funny
- Professional
- Poetic
- Casual
- Factual
- Instagram-style

If no style is provided, default to a fun and descriptive tone. Keep captions short (under 20 words), engaging, and relevant to the image.

Do not make things up. Base your caption on the image and any style provided.
  `;

    const userPrompt = [
        { type: "text", text: style ? `Generate a ${style} caption for this image.` : "Generate a caption for this image." },
        { type: "image_url", image_url: { url: imageUrl } }
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        max_tokens: 100
    });

    return response.choices[0].message.content;
};

module.exports = { generateCaption };