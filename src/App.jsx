import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkNews = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://54.81.96.48/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "⚠️ Failed to fetch API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📰 Fake News Detector</h1>

      <textarea
        className="w-full max-w-lg p-3 rounded-lg border border-gray-300 shadow"
        rows="6"
        placeholder="Paste news text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
        onClick={checkNews}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check News"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white shadow rounded-lg max-w-lg w-full">
          <h2 className="font-semibold mb-2">Result:</h2>
          <pre className="text-gray-800 whitespace-pre-wrap break-words">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
