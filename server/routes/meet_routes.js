import express from 'express';
import { deleteMeet, editMeet, getAllMeets, setMeet } from '../controllers/meet_controllers.js';

const MeetRouter = express.Router();

MeetRouter.post('/addMeet',setMeet);
MeetRouter.get('/getAllMeets',getAllMeets);
MeetRouter.delete('/:id',deleteMeet);
MeetRouter.put('/editMeet/:id',editMeet);

export default MeetRouter;