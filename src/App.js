import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AvailableTasks from "./components/AvailableTasks";
import AddTask from "./components/AddTask";
// import NotFound from "./components/NotFound";
import Home from "./components/Home";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/addtask" element={<AddTask />} />
        <Route exact path="/availabletask" element={<AvailableTasks />} />

        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
