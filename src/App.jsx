import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "News", text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ label: "error", proba: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-indigo-800 mb-6">
        📰 Fake News Detector
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news content here..."
          className="w-full h-40 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
        />

        <button
          onClick={handleCheck}
          disabled={!text || loading}
          className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check News"}
        </button>

        {result && (
          <div
            className={`mt-6 p-4 rounded-xl font-bold text-center ${
              result.label === "fake"
                ? "bg-red-100 text-red-700"
                : result.label === "real"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {result.label === "error"
              ? "Error connecting to server."
              : `Prediction: ${result.label.toUpperCase()} (${(
                  result.proba * 100
                ).toFixed(2)}% confidence)`}
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        ⚡ Powered by ML + React + Tailwind on AWS
      </footer>
    </div>
  );
}

