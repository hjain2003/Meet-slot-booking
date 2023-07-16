import React, { useEffect, useState } from 'react';
import './MainPage.css';
import MeetCard from '../MeetCard/MeetCard';
import AddMeet from '../AddMeet/AddMeet';
import { FaPlus, FaRegKissWinkHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [callMeetbtn, setCallMeetbtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [meetCount, setMeetCount] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('jwtoken');
  console.log("TOKEN : ",token);
  
  const callAddMeetComponent = () => {
    setCallMeetbtn(!callMeetbtn);
  };

  const closeAddMeet = () => {
    setCallMeetbtn(false);
  };

  const [meetCards, setMeetCards] = useState([]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = meetCards.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextClick = () => {
    if (indexOfLastCard < meetCards.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardDelete = (cardId) => {
    setMeetCards(meetCards.filter((card) => card._id !== cardId));
  };

  const [userData, setUserData] = useState('');

  const callHomePage = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('https://meet-slot-booking-backend.vercel.app/user/getUserData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (res.status === 200) {
        const data = await res.json();
        setUserData(data);

        if (data && data._id) {
          showMeets();
        } else {
          setIsLoading(false);
        }
      } else {
        // navigate('/login');
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  const showMeets = async () => {
    try {
      const res = await fetch('https://meet-slot-booking-backend.vercel.app/meets/getAllMeets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (res.status === 200) {
        const data = await res.json();

        const meetsWithUserName = data.meets.map((meet) => ({
          ...meet,
          userName: meet.user.name,
          userId: meet.user._id.toString(),
        }));

        const sortedMeets = meetsWithUserName.sort((a, b) => {
          const dateComparison = new Date(a.date) - new Date(b.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }

          const timeComparison = a.time.localeCompare(b.time);
          return timeComparison;
        });

        const filteredMeets = sortedMeets.filter((meet) => {
          const title = meet.title.toLowerCase();
          const query = searchQuery.toLowerCase();
          return title.includes(query);
        });

        setMeetCards(filteredMeets);
        setIsLoading(false);
      } else {
        console.log('Error:', res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      showMeets();
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  const handleSearchClick = () => {
    showMeets();
  };

  return (
    <>
      <div className="full_page_container">
        {callMeetbtn && <AddMeet key={meetCount} closeAddMeet={closeAddMeet} setMeetCount={setMeetCount} setRefreshPage={setRefreshPage} />}
        <nav>
          <h1>GDSC Meet Slot Bookings</h1>
        </nav>
        <div className="meet_container">
          <div className="search_add">
            <input type="text" id="search" placeholder="Search a meet..." value={searchQuery} onKeyPress={handleKeyPress} onChange={(e) => setSearchQuery(e.target.value)} />
            <button id="search_btn" onClick={handleSearchClick}>Search</button>&nbsp;&nbsp;
            <button id="add_meet" onClick={callAddMeetComponent}>Add a Meet &nbsp; <FaPlus /></button>
          </div>
          <br />
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="card_container">
              <span id="name_mainPage">
                <b>Hey {userData.name} baby&nbsp;<FaRegKissWinkHeart />&nbsp;&nbsp;&nbsp;&nbsp;<span id="logout"><b><NavLink to='/logout'>LOGOUT</NavLink></b></span></b>
              </span>

              {currentCards.map((card, index) => (
                <MeetCard
                  key={index}
                  cardId={card._id}
                  date={card.date}
                  time={card.time}
                  title={card.title}
                  userName={card.userName}
                  userId={card.userId}
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
