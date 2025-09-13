import React, { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://54.81.96.48/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "News Title", text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch result from API");
      }

      const data = await response.json();
      setResult(data.label.toUpperCase());
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Fake News Detector</h1>
          <nav className="space-x-6">
            <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600">About</a>
            <a
              href="http://54.81.96.48/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-indigo-600"
            >
              API Docs
            </a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        {/* Input Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Paste Your News Article
          </h2>
          <textarea
            placeholder="Paste text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            rows="6"
          ></textarea>
          <button
            onClick={handleCheck}
            disabled={loading}
            className={`w-full font-semibold py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Checking..." : "Check Authenticity"}
          </button>
        </div>

        {/* Results Section */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg max-w-md w-full text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
            <h3 className="text-lg font-medium text-gray-800">Result:</h3>
            <p
              className={`mt-3 text-2xl font-bold ${
                result === "REAL" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result === "REAL" ? "✅ REAL News" : "❌ FAKE News"}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Fake News Detector. Built with ❤️ using React + AI.
        </div>
      </footer>
    </div>
  );
}
