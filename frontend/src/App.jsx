import { useState } from 'react'
import CaptionForm from './components/CaptionForm'
import CaptionList from './components/CaptionList'
import { Camera } from 'lucide-react'
import axios from 'axios'



function App() {
  const [captions, setCaptions] = useState([]);
  const [generateFn, setGenerateFn] = useState(null);
  const [loading, setLoading] = useState(false);
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-200">
      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-md shadow-md py-4 px-8 flex items-center gap-2">
        <Camera className="w-7 h-7 text-indigo-600" />
        <h1 className="text-xl font-bold text-indigo-700">CapSnap</h1>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-6">
        <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800 text-center">
          Turn Your Photos Into Captions Instantly ✨
        </h2>

        <CaptionForm setCaptions={setCaptions} setGenerateFn={setGenerateFn}setLoading={setLoading} loading={loading}  />

        {captions.length > 0 && <CaptionList captions={captions} onRegenerate={generateFn} loading={loading}  />}
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-md shadow-inner py-4 text-center text-sm text-gray-600">
        Made with ❤️ using AI · CapSnap © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App
