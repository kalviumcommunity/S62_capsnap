# 📸 CapSnap – AI-Powered Photo Caption Generator

**CapSnap** is a fun and smart web application where users upload images, and the AI automatically generates engaging, descriptive, or funny captions for them. You can create themed captions, reuse past styles, or even get factual context about the image using Retrieval-Augmented Generation (RAG).

---

## 🌟 Features

- 🧠 Upload an image and get a high-quality caption in seconds
- 🗣️ Choose from caption styles like **funny**, **professional**, **poetic**, or **casual**
- 🔍 Use your previously generated captions to keep a consistent tone (RAG)
- 🔧 Customize captions using advanced AI parameters
- 🧾 Save and manage your captioned photo history

---

## 🧠 How AI is Used

### 1. 🧭 System & User Prompts

- **System Prompt:**
  > *You are an image captioning assistant. Given an image and an optional style, generate an engaging, accurate caption. Respond in the requested tone.*

- **User Prompts:**
  - “Generate a funny caption for this beach photo.”
  - “Caption this in poetic style.”
  - “Give me a short professional caption.”
  - “Reuse my last caption style.”

---

### 2. 📄 Structured Output (Example)

```json
{
  "image_id": "img_12345",
  "caption": "Chasing sunsets and salty air 🌅",
  "style": "casual",
  "createdAt": "2025-08-05T10:42:00Z"
}
