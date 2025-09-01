import { useState,useEffect } from "react";
import axios from "axios";
import { Image, Loader2, RefreshCcw } from "lucide-react";


function CaptionForm({ setCaptions,setGenerateFn,setLoading,loading }) {
    const [imageUrl, setImageUrl] = useState("");
    const [style, setStyle] = useState("");
    

    const generateCaption = async () => {
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
    }

    useEffect(() => {
        if (setGenerateFn) {
            setGenerateFn(() => generateCaption);
        }
    }, [imageUrl, style]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await generateCaption();
        
    };
    const handleRegenerate = async () => {
        await generateCaption();
    }

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

                

                {/* Regenerate Button */}
                {/* <button
                    type="button"
                    onClick={handleRegenerate}
                    disabled={loading || !imageUrl}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-lg hover:bg-gray-300 transition flex justify-center items-center gap-2"
                >
                    <RefreshCcw className="w-5 h-5" />
                    {loading ? "..." : "Regenerate"}
                </button> */}
            </form>
            
        </div>
    );
}

export default CaptionForm;