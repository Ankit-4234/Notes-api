import express from 'express';
import notesRouter from './routes/notes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/notes', notesRouter);

app.get('/',(req,res)=>{
    res.send('Notes api is running');
});

app.listen(port, ()=>{
    console.log(`serer running on http://localhost:${port}`);
});