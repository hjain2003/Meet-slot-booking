import React from 'react'
import './AddMeet.css';

const AddMeet = ({closeAddMeet}) => {
  return (
    <>
        <div className="add_meet_container">
            <h2 align="center">Add Meet Details</h2>
            <br />
            <label><i>Title</i></label>
            <input type="text" name="" id="" />
            <br />
            <label><i>Date</i></label>
            <input type="date" name="" id="" />
            <br />
            <label><i>Time</i></label>
            <input type="time" name="" id="" />
            <br /><br />
            <button id="save_meet_details">Save</button>
            <br />
            <button id="cancel" onClick={closeAddMeet}>Cancel</button>
        </div>
    </>
  )
}

export default AddMeet
