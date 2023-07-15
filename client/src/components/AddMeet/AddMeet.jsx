import React, { useState } from 'react'
import './AddMeet.css';

const AddMeet = ({ closeAddMeet , setMeetCount, meetCount, setRefreshPage}) => {

    const [meetDetails, setMeetDetails] = useState({
        date: "",
        time: "",
        title: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const saveMeetDetails = async (e) => {
        e.preventDefault();

        const { date, time, title } = meetDetails;
        try {
            const res = await fetch('https://meet-slot-booking-backend-hjain2003.vercel.app/meets/addMeet', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    time,
                    title
                }),
            });

            const data = await res.json();

            if (res.status === 422) {
                window.alert('Meet setup failed');
            } else if (res.status !== 422) {
                console.log(res.status);
                console.log(data);
                setRefreshPage(true);
                setMeetCount(meetCount+1)
                closeAddMeet();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="add_meet_container">
                <h2 align="center">Add Meet Details</h2>
                <br />
                <label><i>Title &#40;<span className="redit">Word Limit : 13 chars</span>&#41;</i></label>
                <input type="text" name="title" onChange={handleChange} maxLength={13} />
                <br />
                <label><i>Date</i></label>
                <input type="date" name="date" onChange={handleChange} />
                <br />
                <label><i>Time</i></label>
                <input type="time" name="time" onChange={handleChange} />
                <br /><br />
                <button id="save_meet_details" onClick={saveMeetDetails}>Save</button>
                <br />
                <button id="cancel" onClick={closeAddMeet}>Cancel</button>
            </div>
        </>
    )
}

export default AddMeet
