import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import AvailableTasks from "../AvailableTasks";

const storedMsg = JSON.parse(localStorage.getItem("taskMsg"));
const storedDate = JSON.parse(localStorage.getItem("taskDate"));
const storedTime = JSON.parse(localStorage.getItem("taskTime"));

const AddTask = () => {
  console.log(storedMsg);

  const [taskMsg, setTaskMsg] = useState(storedMsg === null ? "" : storedMsg);
  const [date, setDate] = useState(storedDate === null ? "" : storedDate);
  const [time, settime] = useState(storedTime === null ? "" : storedTime);
  const [assignUser, setAssignUser] = useState([]);
  const [user, setUser] = useState("Arun Karthik");
  const [isClicked, setIsClicked] = useState(true);

  useEffect(() => {
    getAssignUsers();
    getAllTasks();
  }, []);

  const jwtToken = Cookies.get("jwt_token");
  const companyid = localStorage.getItem("companyId");

  if (jwtToken === undefined) {
    return (window.location.href = "/login");
  }

  const getAssignUsers = async () => {
    const url = `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyid}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const users = data.results.data.map((item) => item.name);
    setAssignUser(users);
  };

  const getAllTasks = async () => {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyid}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("dataCCCCCCCCCCCCCCCC", data);
  };

  const handleForm = async (event) => {
    event.preventDefault();
    const status = () => setIsClicked((prev) => !prev);
    status();
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyid}`;
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assigned_user: user,
        task_date: date,
        task_time: 500,
        is_completed: 1,
        time_zone: 19800,
        task_msg: taskMsg,
      }),
    };
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("assignedUser", JSON.stringify(user));
        localStorage.setItem("taskDate", JSON.stringify(date));
        localStorage.setItem("taskTime", JSON.stringify(time));
        localStorage.setItem("isCompleted", JSON.stringify(1));
        localStorage.setItem("timeZone", JSON.stringify(19800));
        localStorage.setItem("taskMsg", JSON.stringify(taskMsg));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="main-container4">
      {isClicked && (
        <form className="containerr2 pl-1 pr-1" onSubmit={handleForm}>
          <div className="m-0 p-0">
            <label className="label-inline">Task Description</label>

            <input
              type="text"
              className="input-inline form-control bg-white border border-primary-subtle w-100 pl-1 pr-1"
              onChange={(e) => {
                setTaskMsg(e.target.value);
              }}
              required
            />
          </div>
          <div className="date-time m-0 p-0">
            <div>
              <label className="label-inline">Date</label>

              <input
                type="date"
                className="input-inline form-control bg-white border border-primary-subtle w-100 pl-1 pr-1"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="label-inline">Time</label>

              <input
                type="time"
                className="input-inline form-control bg-white border border-primary-subtle pl-1 pr-1"
                onChange={(e) => {
                  settime(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className=" m-0 p-0">
            <label className="label-inline">Assign User</label>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              required
              onChange={(e) => setUser(e.target.value)}
            >
              {assignUser.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          <div className="m-1 d-flex flex-row justify-content-end">
            <button className="cancel-btn">Cancel</button>
            <button className="btn btn-primary save-btn" button="submit">
              Save
            </button>
          </div>
        </form>
      )}

      {!isClicked && (
        <AvailableTasks taskMsg={taskMsg} date={date} time={time} />
      )}
    </div>
  );
};
export default AddTask;
