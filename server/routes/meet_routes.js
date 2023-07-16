import express from 'express';
import { deleteMeet, editMeet, getAllMeets, getMeetById, setMeet } from '../controllers/meet_controllers.js';
import { Authenticate } from '../middlewares/auth.js';

const MeetRouter = express.Router();

MeetRouter.post('/addMeet',Authenticate,setMeet);
MeetRouter.get('/getAllMeets',Authenticate,getAllMeets);
MeetRouter.get('/getMeetbyId/:id',getMeetById);
MeetRouter.delete('/:id',deleteMeet);
MeetRouter.put('/editMeet/:id',editMeet);

export default MeetRouter;