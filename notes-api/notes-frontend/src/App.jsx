import { useState, useEffect } from "react";
import "./App.css";

const BASE_URL = "https://notes-api-qjni.onrender.com/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [authMode, setAuthMode] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Could not load notes, try refreshing");
    } finally {
      setLoading(false);
    }
  };
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!authUsername.trim() || !authPassword.trim()) {
      setError("Username and password cannot be empty");
      return;
    }
    const endPoint = authMode === "login" ? "login" : "signup";
    const res = await fetch(`${BASE_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: authUsername, password: authPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      setAuthError(data.error || "something went wrong.");
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    setToken(data.token);
    setUsername(data.username);
    setAuthUsername("");
    setAuthPassword("");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setNotes([]);
  };
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!title.trim() || !content.trim()) {
      setError("Title and Content cannot be empty");
      return;
    }
    setError("");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (editingId) {
      await fetch(`${BASE_URL}/notes/${editingId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, content }),
      });
      setEditingId(null);
    } else {
      await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, content }),
      });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };
  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setError("");
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
  };
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };
  if (!token) {
    return (
      <div className="app">
        <h1>My-Notes</h1>
        <form onSubmit={handleAuthSubmit} className="note-form">
          <input
            type="text"
            placeholder="username"
            value={authUsername}
            onChange={(e) => setAuthPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
          />
          {authError && <p className="error-text">{authError}</p>}
          <button type="submit">
            {" "}
            {authMode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="status-text">
          {authMode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            className="link-btn"
            onClick={() => {
              setAuthMode(authMode === "login" ? "Sign Up" : "login");
              setAuthError("");
            }}
          >
            {authMode === "login" ? "signup" : "login"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header-row">
        <h1>my Notes</h1>
        <div className="user-info">
          <span>Hi, {username}</span>
          <button onClick="{handleLogout}" className="cancel-btn">
            logout
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Note" : "Add Note"}
          </button>
          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <p className="status-text"> Loading notes.....</p>
      ) : notes.length === 0 ? (
        <p className="status-text"> no notes yet, add your first note </p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
