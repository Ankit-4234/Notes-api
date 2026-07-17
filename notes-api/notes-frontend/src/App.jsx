import { useState, useEffect } from 'react';
import './App.css';

const API_URL='http://localhost:3000/api/notes';

function App(){
    const [notes,setNotes]=useState([]);
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [editingId,setEditingId]=useState(null);

useEffect(()=>{
fetchNotes();
}, []);
const fetchNotes = async ()=>{
    const res = await fetch(API_URL);
    const data = await res.json();
    setNotes(data);

};
const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!title || !content) return;
    if(editingId){
        await fetch(`${API_URL}/${editingId }`,{
            method :'PUT',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({title,content}),
        });
        setEditingId(null);
    }else{
        await fetch(API_URL,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({title,content}),
        });
    }
    setTitle('');
    setContent('');
    fetchNotes();

};
const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
};
const handleDelete= async(id) =>{
    await fetch (`${API_URL}/${id}`,{method : 'DELETE'});
    fetchNotes();
};
return (
    <div className="app">
        <h1>my Notes</h1>
        <form onSubmit={handleSubmit} className="note-form">
            <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            <textarea placeholder="content" value={content} onChange={(e)=> setContent(e.target.value)}/>
            <button type="submit"> {editingId ? 'Update Note' : 'Add Note' }</button>

        </form>
        <div className="notes-list">
            {notes.map((note)=>(
                <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="note-actions">
                        <button onClick={()=> handleEdit(note)}>Edit</button>
                        <button onClick={()=> handleDelete(note._id)}>Delete</button>
                        </div>
                        </div>
            ))}
        </div>
    </div>
);
}
export default App;