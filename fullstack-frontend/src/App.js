import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./users/AddUser";
import Edituser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<Edituser />} />
          <Route path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
