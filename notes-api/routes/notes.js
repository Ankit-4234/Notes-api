import express from 'express';
import Note from '../models/note.js';
const router = express.Router();

router.get('/',async(req,res)=>{
    const notes= await Note.find().sort({createdAt: -1});
    res.json(notes);
});
router.get('/:id',async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({error:'note not found'});
    res.json(note);
});
router.post('/',async(req,res)=>{
    const {title, content}=req.body;
    if(!title || !content){
        return res.status(400).json({error: 'Title and content are required'});
    }
    const newNote = await Note.create({title, content});    
    res.status(201).json(newNote);
});
router.put('/:id',async(req,res)=>{
    const note= await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({error:'note not found'});
    }
    const {title, content} = req.body;
    if (title) note.title=title;
    if(content) note.content=content;
    await note.save();
    res.json(note);
});
router.delete('/:id',async(req,res)=>{
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note){
        return res.status(404).json({error: 'note not found'});
    }
    res.status(204).send();
})
export default router;