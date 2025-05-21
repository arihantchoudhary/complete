import { useEffect, useState } from "react";

const Landing = () => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Load the index.html content
    fetch("/index.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Extract the content we want to render
        const bodyContent = tempDiv.querySelector("body")?.innerHTML || "";
        if (!bodyContent) {
          throw new Error("No content found in the HTML file");
        }
        setContent(bodyContent);
      })
      .catch((error) => {
        console.error("Error loading landing page:", error);
        setError(
          "Failed to load landing page content. Please try again later."
        );
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="landing-page"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Landing;
