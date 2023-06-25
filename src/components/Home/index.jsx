import Cookies from "js-cookie";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import "./index.css";
import AddTask from "../AddTask";

const Home = () => {
  const [noOfTasks, setNoOfTasks] = useState(0);
  const [activeTaskBtn, setActiveTaskBtn] = useState(false);

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken === undefined) {
    return (window.location.href = "/login");
  }

  const onAddTask = () => {
    setActiveTaskBtn((prevValue) => !prevValue);
    setNoOfTasks((prevValue) => (prevValue === 0 ? 1 : 0));
  };

  return (
    <div className="main-container1">
      <div className="containerr1 shadow">
        <div className="tasks m-1">
          <p className="bg-white p-1 border border-primary-subtle para">
            TASKS <span>{noOfTasks}</span>
          </p>
          <p>
            <button className=" button bg-white border border-primary-subtle p-1">
              <BsPlusLg className="icon " onClick={onAddTask} />
            </button>
          </p>
        </div>
        {activeTaskBtn === true && <AddTask />}
      </div>
    </div>
  );
};
export default Home;
