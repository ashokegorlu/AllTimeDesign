import Cookies from "js-cookie";
import React from "react";
import { IoMdContact } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { MdEdit } from "react-icons/md";

import "./index.css";

const AvailableTasks = (props) => {
  const { taskMsg, date, time } = props;

  const companyid = localStorage.getItem("companyId");
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken === undefined) {
    return (window.location.href = "/login");
  }

  const updateTask = async () => {
    window.location.href = "/";
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/<task_id>?company_id=${companyid}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assigned_user: JSON.parse(localStorage.getItem("assignedUser")),
        task_date: JSON.parse(localStorage.getItem("taskDate")),
        task_time: 500,
        is_completed: 1,
        time_zone: 19800,
        task_msg: JSON.parse(localStorage.getItem("taskMsg")),
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
  };

  return (
    <div>
      <li className="containerr pr-1 p-1 ">
        <div className="d-flex flex-row justify-content-start">
          <IoMdContact className="icon text-primary" />
          <p>
            {taskMsg} <br />
            {date} at {time}
          </p>
        </div>
        <div>
          <button className="button-edit" onClick={updateTask}>
            <MdEdit className="icon-tick border border-primary-subtle mr-1" />
          </button>

          <TiTick className="icon-tick text-dark border border-primary-subtle" />
        </div>
      </li>
    </div>
  );
};
export default AvailableTasks;
