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
    res.json()
})