"use client";

import { useState, ChangeEvent } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const uploadAndChat = async (): Promise<void> => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("File upload failed");
      }

      const { sessionId }: { sessionId: string } = await res.json();
      console.log("Session ID:", sessionId);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <main className="p-6">
      <input
        type="file"
        accept=".pdf"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
      />
      <button
        onClick={() => uploadAndChat()}
        disabled={!file}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload & Start Chat
      </button>
    </main>
  );
}
