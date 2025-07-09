import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";
import Sidebar from "./Components/Sidebar";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes >
          <Route path="/" element={<Home/>}></Route>
          <Route path="/adduser" element={<AddUser />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
