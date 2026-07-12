import express from 'express';
const router = express.Router();

let notes = [
    { id :1 , title : 'first note' , content='this is my first note'}
];
let nextId = 2;
router.get('/', (req,res) =>{
    res.json(notes);
});
router.get('/:id',(req,res)=>{
    const note= notes.find(n=> n.id === Number(req.params.id));
    if(!note){
        return res.status(404).json({error: 'note not found'});
    }
    res.json(note);
});
router.post('/',(req,res)=>{
    const {title, content}=req.body;
    if(!title || !content){
        return res.status(400).json({error: 'Title and content are required'});
    }
    const newNote = {id:nextId++, title, contant};
    notes.push(newNote);
    res.status[200].json(newNote);
});
router.put('/:id',(req,res)=>{
    const note = notes.find(n => n.id === Number(req.params.id));
    if(!note){
        return res.status(404).json({error:'note not found'});
    }
    const {title, content} = req.body;
    if (title) note.title=title;
    if(content) note.content=content;
    res.json(note);
});
router.delete('/:id',(req,res)=>{
    const index = notes.findIndex(n => n.id === Number(req.params.id));
    if(index === -1){
        return res.status(404).json({error: 'note not found'});
    }
    notes.splice(index,1);
    res.status(204).send();
})
export default router;