import { useState } from "react";
import axios from "axios";
import { Image, Loader2 } from "lucide-react";

function CaptionForm({ setCaptions }) {
    const [imageUrl, setImageUrl] = useState("");
    const [style, setStyle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/api/caption/generate", {
                message: `Generate captions for this image: ${imageUrl} in ${style} style.`,
            });

            setCaptions(response.data.captions || []);
        } catch (error) {
            console.error(error);
            setCaptions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full px-6 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-5 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
                {/* Heading with icon */}
                <div className="flex flex-col items-center text-center gap-2">
                    <Image className="w-10 h-10 text-indigo-500" />
                    <h2 className="text-2xl font-bold text-gray-800">Generate Captions</h2>
                    <p className="text-sm text-gray-500">
                        Upload your image URL & choose a style
                    </p>
                </div>

                {/* Input field */}
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    required
                />

                {/* Style dropdown */}
                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                >
                    <option value="">Select Style (Optional)</option>
                    <option value="funny">😂 Funny</option>
                    <option value="professional">💼 Professional</option>
                    <option value="poetic">✨ Poetic</option>
                </select>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-4 py-3 rounded-lg hover:scale-105 transition-transform flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate Captions"
                    )}
                </button>
            </form>
        </div>
    );
}

export default CaptionForm;