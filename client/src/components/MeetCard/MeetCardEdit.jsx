import React, { useState, useEffect } from 'react';
import './MeetCardEdit.css';

const MeetCardEdit = ({ closeMeetCardEdit, meetId }) => {
    const [meetDetails, setMeetDetails] = useState({
        title: "",
        date: "",
        time: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveMeetDetails = async (e) => {
        e.preventDefault();

        const { title, date, time } = meetDetails;

        try {
            const response = await fetch(`http://localhost:5000/meets/editMeet/${meetId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, date, time })
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data.message);
                closeMeetCardEdit();
                window.alert("Reload the page");
            } else if (response.status === 404) {
                console.log('Meet not found');
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        closeMeetCardEdit();
    };

    useEffect(() => {
        const fetchMeetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/meets/getMeetbyId/${meetId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setMeetDetails({
                        title: data.title,
                        date: data.date,
                        time: data.time
                    });
                } else if (response.status === 404) {
                    console.log('Meet not found');
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchMeetDetails();
    }, [meetId]);

    return (
        <>
            <div className="add_meet_containers">
                <h2 align="center">Edit Meet Details</h2>
                <br />
                <label><i>Title</i></label>
                <input type="text" name="title" value={meetDetails.title} onChange={handleChange} />
                <br />
                <label><i>Date</i></label>
                <input type="date" name="date" value={meetDetails.date} onChange={handleChange} />
                <br />
                <label><i>Time</i></label>
                <input type="time" name="time" value={meetDetails.time} onChange={handleChange} />
                <br /><br />
                <button id="save_meet_details" onClick={saveMeetDetails}>Save</button>
                <br />
                <button id="cancel" onClick={handleCancel}>Cancel</button>
            </div>

        </>
    );
};

export default MeetCardEdit;
