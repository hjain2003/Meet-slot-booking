import React from 'react'
import './MeetCard.css';

const MeetCard = (props) => {
  return (
    <>
        <div className="card">
            <span className='card_info'>{props.date}</span>
            <span className='card_info'>{props.time}</span>
            <span className='card_info'>{props.title}</span>
            <button id="edit_btn">Edit</button>
            <button id="delete_btn">Delete</button>
        </div>
    </>
  )
}

export default MeetCard
