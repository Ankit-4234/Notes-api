import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Could not load notes, try refreshing");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }
    setError("");
    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      setEditingId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
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
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };
  return (
    <div className="app">
      <h1>my Notes</h1>
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
            {" "}
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
        <p className="status-text"> Loading notes</p>
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
