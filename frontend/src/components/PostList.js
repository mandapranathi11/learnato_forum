import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();

    socket.on("new_post", fetchPosts);
    socket.on("upvote", fetchPosts);

    return () => {
      socket.off("new_post");
      socket.off("upvote");
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discussion Forum</h1>

        <Link
          to="/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + New Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/post/${p.id}`}
            className="block border p-4 rounded-lg hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.content}</p>
            <div className="mt-2 text-gray-500">
              👍 {p.votes} · {p.replies?.length || 0} replies
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
