import React, { useContext, useState } from "react";
import styles from "../styles/login.module.css";
import { TeamContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const { userNamesList, setCurrentUser } = useContext(TeamContext);
  const navigate = useNavigate();

  const validation = () => {
    const combinedUser = {
      userName,
      password,
    };

    const result = userNamesList.find(
      (user) =>
        user.userName == combinedUser.userName &&
        user.password == combinedUser.password
    );

    if (result) {
      setCurrentUser(result);
      navigate(`/team/${result.team.name}`);
    } else {
      throw `UserName ${combinedUser.userName} doesnt exist or the password doesnt match`;
    }
  };

  return (
    <div>
      <h1>Football Club Svcollege</h1>
      <div className={styles.mainDiv}>
        <input
          type="text"
          placeholder="Username"
          onInput={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onInput={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? validation() : null)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => validation()}>Login</button>
        <button onClick={() => navigate("/Register")}>Register</button>
      </div>
    </div>
  );
}
