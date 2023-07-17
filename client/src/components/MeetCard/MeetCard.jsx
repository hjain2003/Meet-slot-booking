import React, { useState } from 'react';
import './MeetCard.css';
import MeetCardEdit from './MeetCardEdit';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MeetCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleEdit = () => {
    // Check if the logged-in user is the creator of the meet
    if (props.userId === localStorage.getItem('userId')) {
      setEditMode(true);
    } else {
      setErrorMsg(true);
      console.log('You are not authorized to edit this meet.');
    }
  };

  const closeMeetCardEdit = () => {
    setEditMode(false);
  };

  const handleDelete = async () => {
    // Check if the logged-in user is the creator of the meet
    if (props.userId === localStorage.getItem('userId')) {
      try {
        const response = await fetch(`https://meet-slot-booking-backend.vercel.app/meets/${props.cardId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('MeetCard deleted successfully');
          props.onDelete(props.cardId);
        } else {
          console.log('Error:', response.status);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg(true);
      console.log('You are not authorized to delete this meet.');
    }
  };

  const closeError = () => {
    setErrorMsg(false);
  }
  return (
    <>
      {editMode && <MeetCardEdit closeMeetCardEdit={closeMeetCardEdit} meetId={props.cardId} />}
      {errorMsg && <div className='error_msg_box'>BKL TERA MEET NAHI HAI <br /><br /><button id="close_error" onClick={closeError}>Hmm Mai hi Chutiya hu</button></div>}
      <div className="card_wrapper">
        <div className="name_buttons">
          <span className="card_info"><b>{props.userName}</b></span>
          <span onClick={handleEdit}><button id="edit_btn">
            Edit
          </button>
          </span>
          <span onClick={handleDelete}><button id="delete_btn" className='edit_del'>
            Delete
          </button>
          </span>
        </div>
        <div className="card">
          <span className="card_info"><b>{props.date}</b></span>
          <span className="card_info"><i>{props.time}</i></span>
          <span className="card_info">{props.title}</span>
          
        </div>
      </div>

    </>
  );
};

export default MeetCard;
