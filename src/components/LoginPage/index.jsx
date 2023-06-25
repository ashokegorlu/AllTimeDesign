import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [statusError, setStatusError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // console.log(email);
  // console.log(password);

  const handleForm = async (event) => {
    event.preventDefault();

    const url = "https://stage.api.sloovi.com/login?product=outreach";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // console.log(data.results.token);
      const token = data.results.token;

      if (data.code === 200) {
        Cookies.set("jwt_token", token, { expires: 1 });
        localStorage.setItem("companyId", data.results.company_id);
        localStorage.setItem("userId", data.results.user_id);
        window.location.href = "/";
      } else {
        setErrorMsg(data.message);
        setStatusError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("An error occurred. Please try again later.");
      setStatusError(true);
    }
  };
  return (
    <div className="main-container text-center">
      <div className="containerr container shadow">
        <h1>Login Page!</h1>
        <form onSubmit={handleForm} autoComplete="on">
          <div className="p-2 form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              required
              type="text"
              className="form-control"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="p-2 form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              required
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </div>
          {statusError && <p className="text-danger">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
