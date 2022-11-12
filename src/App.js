import './App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'
import Reset from './Reset';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
