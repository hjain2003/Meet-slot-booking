import React, { useState } from 'react';
import './MainPage.css';
import MeetCard from '../MeetCard/MeetCard';
import AddMeet from '../AddMeet/AddMeet';

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [callMeetbtn,setCallMeetbtn] = useState(false);

    const callAddMeetComponent = ()=>{
        setCallMeetbtn(!callMeetbtn);
    }

    const closeAddMeet = ()=>{
        setCallMeetbtn(false);
    }

    // Sample data for demonstration
    const meetCards = [
        { date: '13/06/2003', time: '05:50 PM', title: 'Web Dev Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
        { date: '13/06/2003', time: '05:50 PM', title: 'ML/AI Meet' },
    ];

    // Calculate the indexes of the cards to display
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = meetCards.slice(indexOfFirstCard, indexOfLastCard);

    // Handle "Next" button click
    const handleNextClick = () => {
        if (indexOfLastCard < meetCards.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle "Previous" button click
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="full_page_container">
                {callMeetbtn && <AddMeet closeAddMeet={closeAddMeet}/>}
                <nav>
                    <h1>GDSC Meet Slot Bookings</h1>
                </nav>

                <div className="meet_container">
                    <div className="search_add">
                        <input type="text" id="search" placeholder="Search a meet..." />
                        <button id="search_btn">Search</button>&nbsp;&nbsp;
                        <button id="add_meet" onClick={callAddMeetComponent}>Add a Meet</button>
                    </div>
                    <br />
                    <div className="card_container">
                        {currentCards.map((card, index) => (
                            <MeetCard
                                key={index}
                                date={card.date}
                                time={card.time}
                                title={card.title}
                            />
                        ))}
                    </div>
                    <div className="button_container">
                        {currentPage > 1 && (
                            <button id="prev_button" onClick={handlePrevClick}>
                                Previous
                            </button>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        {indexOfLastCard < meetCards.length && (
                            <button id="next_button" onClick={handleNextClick}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
