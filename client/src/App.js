import './App.css';
import MainPage from './components/MainPage/MainPage';
import AddMeet from './components/AddMeet/AddMeet';
import { Routes, Route } from 'react-router-dom';
import Register from './components/SignUp/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element={<MainPage/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
