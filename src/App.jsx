import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // result will be { label: string, proba: number } | null
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setResult({ label: "error", proba: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📰 Fake News Detector
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />

        <textarea
          placeholder="Enter news text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows="5"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Check News"}
        </button>
      </form>

      {result && (
        <div className="mt-6 w-full max-w-md p-4 border rounded-lg bg-gray-100 text-center">
          <p className="text-lg">
            Prediction:{" "}
            <span
              className={
                result.label === "fake" ? "text-red-600 font-bold" : "text-green-600 font-bold"
              }
            >
              {result.label.toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Confidence: {(result.proba * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
