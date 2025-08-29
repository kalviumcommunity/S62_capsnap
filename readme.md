📸 CapSnap – AI-Powered Photo Caption Generator

CapSnap is a fun and smart MERN-stack web application where users upload images, and the AI automatically generates engaging, descriptive, or funny captions for them.
You can create themed captions, reuse past styles, or even get factual context about the image using Retrieval-Augmented Generation (RAG).

🌟 Features

🧠 AI-Powered Captioning – Upload an image and get high-quality captions in seconds

🗣️ Multiple Styles – Choose from funny, professional, poetic, or casual captions

🔍 RAG for Consistency – Reuse your previously generated captions to keep a consistent tone

🎛️ Customization – Adjust caption length, tone, or creativity level

🧾 Caption History – Save, manage, and revisit your captioned photos

🧠 How AI is Used
1. 🧭 Prompt Engineering

CapSnap uses structured system + user prompts to guide caption generation.

System Prompt

You are an image captioning assistant. Given an image and an optional style, generate an engaging, accurate caption. Respond in the requested tone.

User Prompts Examples

“Generate a funny caption for this beach photo.”

“Caption this in poetic style.”

“Give me a short professional caption.”

“Reuse my last caption style.”

2. 📄 Structured Output (Example)
{
  "image_id": "img_12345",
  "caption": "Chasing sunsets and salty air 🌅",
  "style": "casual",
  "createdAt": "2025-08-05T10:42:00Z"
}


This format makes captions easy to store, query, and reuse.

⚙️ Implementation Details

CapSnap is built using the MERN stack (MongoDB, Express.js, React, Node.js) with AI integration.

🔹 Frontend (React + TailwindCSS)

Clean, responsive UI for uploading images and selecting caption styles

Displays generated captions with a polished design

Axios for API requests

🔹 Backend (Node.js + Express)

API endpoints for sending user requests to the AI model

Uses middleware for authentication & error handling

Supports POST /api/caption/generate route

🔹 AI Integration

AI model generates captions based on the image URL + style

RAG mechanism fetches previous captions from MongoDB to maintain consistency

🔹 Database (MongoDB + Mongoose)

Stores:

{
  "userId": "u_001",
  "imageUrl": "https://example.com/image.jpg",
  "captions": [
    {
      "text": "A dog enjoying the sunshine 🐶☀️",
      "style": "casual",
      "createdAt": "2025-08-29T09:10:00Z"
    }
  ]
}

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/capsnap.git
cd capsnap

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the backend:

MONGODB_URI=your_mongo_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=8080

4. Run the App
# Start backend
cd backend && npm start  

# Start frontend
cd frontend && npm run dev 