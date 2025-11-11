import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";

const API_URL = "http://localhost:5000/api/posts";

function FeedPage({ token }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  async function fetchPosts() {
    setError("");
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load posts");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <CreatePost token={token} onPostCreated={fetchPosts} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 && <p>No posts yet</p>}
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <strong>{post.user.name}</strong>
          <p>{post.text}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
