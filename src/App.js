import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Login from "./components/Authentication/Login/Login";
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Page from './components/Page/Page';
import Register from './components/Authentication/Register/Register';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path="/Passwordreset" element={<ForgotPasswordEmail />} /> */}
          {/* <Route path="/resetauth" element={<ResetAuth />} /> */}
          <Route element={<Sidebar />}>
            <Route path="/main/dashboard" element={<Dashboard />} />
            <Route path="/main/page" element={<Page />} />
            {/* <Route path="/main/help&support" element={<Help />} /> */}

            {/* <Route path="/profile"element={<Profile/>}/> */}
          </Route>
          {/* <Route path="/profile" element={<Profile />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
