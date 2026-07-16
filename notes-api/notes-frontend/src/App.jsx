import { useState, useEffect } from 'react';
import './App.css';

const API_URL='http://localhost:3000/api/notes';

function App(){
    const [note,setNotes]=useState([]);
    const [title,setTitle]=useState('');
    const [content,setContent]=usestate('');
    const [editingId,setEditingId]=usestate(null);
}
useEffect(()=>{
fetchNotes();
}, []);