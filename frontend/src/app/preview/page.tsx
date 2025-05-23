"use client";
import { useState } from "react";

export default function Preview() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/generate-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setHtml(data.html);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-40 p-2 border rounded"
        placeholder="Describe tu portafolio: colores, estilos, proyectos..."
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded 
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {loading ? "Generando..." : "Generar Portafolio"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {html && (
        <div className="mt-4 border rounded">
          <iframe
            srcDoc={html}
            className="w-full h-[600px]"
            sandbox="allow-scripts"
          />
        </div>
      )}
    </div>
  );
}
