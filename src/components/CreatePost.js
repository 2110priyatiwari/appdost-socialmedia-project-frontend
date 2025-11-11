import React, { useState } from "react";
import axios from "axios";

function CreatePost({ fetchPosts }) {
  const [form, setForm] = useState({
    text: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "image") {
      setPreview(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { text: form.text, image: form.image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm({ text: "", image: "" });
      setPreview("");
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return (
    <div style={styles.container}>
      <h3> Create Post </h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          name="text"
          placeholder="Write something..."
          value={form.text}
          onChange={onChange}
          required
          style={styles.textarea}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={onChange}
          style={styles.input}
        />

        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <button type="submit" style={styles.button}>Post</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  preview: {
    borderRadius: "8px",
    maxHeight: "200px",
    objectFit: "cover",
  },
  button: {
    padding: "10px",
    background: "#0073b1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default CreatePost;
