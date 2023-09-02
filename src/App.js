import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from "./components/Authentication/Login/Login";
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
function App() {
  let token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  useEffect(() => {
    if (token === null) {
      setIsLoggedIn(false)
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/Register' element={<Register />} />
          <Route path="/Passwordreset" element={<ForgotPasswordEmail />} />
          <Route path="/resetauth" element={<ResetAuth />} /> */}
          <Route element={isLoggedIn ? <Sidebar /> : <Login />}>
            <Route path="/main/dashboard" element={<Dashboard />} />
            {/* <Route path="/main/settings" element={<Settings />} />
            <Route path="/main/help&support" element={<Help />} /> */}

            {/* <Route path="/profile"element={<Profile/>}/> */}
          </Route>
          {/* <Route path="/profile" element={<Profile />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
