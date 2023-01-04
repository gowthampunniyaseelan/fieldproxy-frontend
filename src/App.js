import './App.css';
import Signup from './Signup';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import DashBoard from './DashBoard';
function App() {
 
  return (
    <div className="app">
    <>
    <Router>
    <Routes>
    <Route path="/" element={<Signup/>}/>
    {window.localStorage.getItem("password") ? <Route path="/dashboard" element={<DashBoard/>}/> : ""}
    </Routes>
    </Router>
    </>
    </div>
  );
}

export default App;