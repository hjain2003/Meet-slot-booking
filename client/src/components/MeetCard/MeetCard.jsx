import React, { useState } from 'react'
import './MeetCard.css';
import MeetCardEdit from './MeetCardEdit';

const MeetCard = (props) => {

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true);
      };

      const closeMeetCardEdit = () => {
        setEditMode(false);
    };

    const handleDelete = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/meets/${props.cardId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
      
            if (response.status === 200) {
              console.log('Password deleted successfully');
              props.onDelete(props.cardId);
            } else {
              console.log('Error:', response.status);
            }
          } catch (err) {
            console.log(err);
          }
    }
  return (
    <>
        {editMode && <MeetCardEdit closeMeetCardEdit={closeMeetCardEdit} meetId={props.cardId}/>}
        <div className="card">
            <span className='card_info'>{props.date}</span>
            <span className='card_info'>{props.time}</span>
            <span className='card_info'>{props.title}</span>
            <button id="edit_btn" onClick={handleEdit}>Edit</button>
            <button id="delete_btn" onClick={handleDelete}>Delete</button>
        </div>
    </>
  )
}

export default MeetCard
