import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await API.post("/posts", { title, content });
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full rounded mb-4"
        rows="6"
        placeholder="Write your question..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}
