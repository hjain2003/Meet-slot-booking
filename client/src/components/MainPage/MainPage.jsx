import React, { useEffect, useState } from 'react';
import './MainPage.css';
import MeetCard from '../MeetCard/MeetCard';
import AddMeet from '../AddMeet/AddMeet';

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [callMeetbtn, setCallMeetbtn] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [meetCount, setMeetCount] = useState(0);
    const [refreshPage, setRefreshPage] = useState(false);

    const callAddMeetComponent = () => {
        setCallMeetbtn(!callMeetbtn);
    }

    const closeAddMeet = () => {
        setCallMeetbtn(false);
    }

    // Sample data for demonstration
    const [meetCards, setMeetCards] = useState([]);

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

    const handleCardDelete = (cardId) => {
        setMeetCards(meetCards.filter((card) => card._id !== cardId));
      };
      

    const showMeets = async () => {
        try {
            const res = await fetch('http://localhost:5000/meets/getAllMeets', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (res.status === 200) {
                setIsLoading(false);
                const data = await res.json();
                setMeetCards(data.meets);
            } else {
                console.log('Error:', res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showMeets();
        setRefreshPage(false);
    }, [refreshPage]);

    return (
        <>
            <div className="full_page_container">
                {callMeetbtn && <AddMeet key={meetCount} closeAddMeet={closeAddMeet} setMeetCount={setMeetCount} setRefreshPage={setRefreshPage} />}
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
                    {IsLoading ? (<h1>Loading...</h1>) : (
                        <div className="card_container">
                            {currentCards.map((card, index) => (
                                <MeetCard
                                    key={index}
                                    cardId={card._id}
                                    date={card.date}
                                    time={card.time}
                                    title={card.title}
                                    onDelete={handleCardDelete}
                                />
                            ))}
                        </div>
                    )}

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
