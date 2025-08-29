import { useState } from "react";
import { Copy, MessageSquareQuote } from "lucide-react";

function CaptionList({ captions }) {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (caption, index) => {
        navigator.clipboard.writeText(caption);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500); // reset copy status
    };

    if (!captions || captions.length === 0) {
        return (
            <div className="mt-6 w-full max-w-lg text-center text-gray-500 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <MessageSquareQuote className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
                <p>No captions generated yet. Upload an image to get started!</p>
            </div>
        );
    }

    return (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <MessageSquareQuote className="w-6 h-6 text-indigo-500" />
                Generated Captions
            </h2>

            <ul className="space-y-3">
                {captions.map((caption, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100 hover:shadow-md transition"
                    >
                        <span className="text-gray-700">{caption}</span>
                        <button
                            onClick={() => handleCopy(caption, index)}
                            className="ml-3 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                            <Copy className="w-4 h-4" />
                            {copiedIndex === index ? "Copied!" : "Copy"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CaptionList;
