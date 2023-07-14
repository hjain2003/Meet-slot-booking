import express from 'express';
import { deleteMeet, editMeet, getAllMeets, getMeetById, setMeet } from '../controllers/meet_controllers.js';

const MeetRouter = express.Router();

MeetRouter.post('/addMeet',setMeet);
MeetRouter.get('/getAllMeets',getAllMeets);
MeetRouter.get('/getMeetbyId/:id',getMeetById);
MeetRouter.delete('/:id',deleteMeet);
MeetRouter.put('/editMeet/:id',editMeet);

export default MeetRouter;