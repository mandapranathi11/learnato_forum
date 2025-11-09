import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState("");

  // ✅ useCallback prevents React warnings
  const fetchPost = useCallback(async () => {
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
  }, [id]);

  useEffect(() => {
    fetchPost();

    socket.on("new_reply", fetchPost);
    socket.on("upvote", fetchPost);

    return () => {
      socket.off("new_reply");
      socket.off("upvote");
    };
  }, [fetchPost]);

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  const sendReply = async () => {
    await API.post(`/posts/${id}/reply`, { content: reply });
    setReply("");
  };

  const upvote = async () => {
    await API.post(`/posts/${id}/upvote`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <button
        onClick={() => window.history.back()}
        className="text-blue-600 underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.content}</p>

      <button
        onClick={upvote}
        className="mt-4 bg-green-600 text-white px-3 py-1 rounded"
      >
        👍 Upvote ({post.votes})
      </button>

      <h2 className="text-xl font-semibold mt-6">Replies</h2>
      <div className="space-y-3 mt-2">
        {post.replies.map((r) => (
          <div key={r.id} className="border p-3 rounded">
            {r.content}
          </div>
        ))}
      </div>

      <textarea
        className="border p-2 w-full rounded mt-4"
        rows="3"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />

      <button
        onClick={sendReply}
        className="bg-blue-600 text-white px-3 py-2 rounded mt-2"
      >
        Reply
      </button>
    </div>
  );
}
