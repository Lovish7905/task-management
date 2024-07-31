import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import axios from "axios";
import HomePage from "./Components/HomePage.jsx";
import { UserContextProvider } from "./Components/UserContext";
import CreateTask from "./Components/CreateTask.jsx";
import EditPage from "./Components/EditPage.jsx";
axios.defaults.baseURL = "https://task-management-b6mh.onrender.com";
axios.defaults.withCredentials = true;
function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/createTask/:column" element={<CreateTask />} />
          <Route path="/editpage/:id" element={<EditPage />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
