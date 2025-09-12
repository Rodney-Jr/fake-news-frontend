import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const API_URL = "http://54.81.96.48"; // backend address

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ label: string; proba: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          📰 Fake News Detector
        </h1>

        <input
          type="text"
          placeholder="Enter news title"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter news text"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring min-h-[120px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Check News"}
        </button>

        {error && (
          <p className="text-red-600 text-center">❌ Error: {error}</p>
        )}

        {result && (
          <div className="text-center space-y-2">
            <p className="text-lg">
              Prediction:{" "}
              <span
                className={
                  result.label === "FAKE" ? "text-red-600 font-bold" : "text-green-600 font-bold"
                }
              >
                {result.label}
              </span>
            </p>
            <p className="text-gray-600">
              Confidence: {(result.proba * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
