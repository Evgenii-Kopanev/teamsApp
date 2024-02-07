import React, { useContext, useState } from "react";
import styles from "../styles/register.module.css";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../contexts/context";

export default function Register() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [team, setTeam] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  //---------------
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showTeamError, setShowTeamError] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);
  //-----------------
  const navigate = useNavigate();
  const { userNamesList, setUserNamesList } = useContext(TeamContext);

  const createNewUser = () => {
    if (password === confirmPassword) {
      const newUser = {
        userName,
        password,
        team: {
          name: team,
          players: [],
        },
      };

      let userNamesListClone = structuredClone(userNamesList);
      userNamesListClone.push(newUser);
      setUserNamesList(userNamesListClone);

      navigate("/");
    }
  };

  //team validation
  const validateTeam = (teamName) => {
    let flag = true;
    for (let i = 0; i < teamName.length; i++) {
      if (
        !(
          teamName[i] < "a" &&
          teamName[i] > "z" &&
          teamName[i] < "A" &&
          teamName[i] > "Z"
        )
      ) {
        if (teamName[i] >= "A" && teamName[i] <= "Z") {
          if (i == 0 || teamName[i - 1] == " ") {
            flag = true;
          } else {
            flag = false;
          }
        }
      } else {
        flag = false;
      }
    }
    if (flag) {
      setTeam(teamName);
      setShowTeamError(false);
    } else {
      setShowTeamError(true);
    }
  };
  //Password Validation
  const validatePassword = (password) => {
    let flag = true;
    let capital = false;
    let small = false;
    let number = false;
    let special = false;
    if (password.length >= 8 && password.length <= 20) {
      for (let i = 0; i < password.length; i++) {
        if (password[i] >= "0" && password[i] <= "9") {
          number = true;
        }
        if (password[i] >= "a" && password[i] <= "z") {
          small = true;
        }
        if (password[i] >= "A" && password[i] <= "Z") {
          capital = true;
        }
        if (password[i] >= "!" && password[i] < "0") {
          special = true;
        }
      }
    } else {
      flag = false;
    }
    if (capital && small && number && special) {
      setPassword(password);
      setShowPasswordError(false);
    } else if (password.length == 0) {
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
    }
  };
  //Confirm Password Validation
  const validateConfirmPassword = (passVal) => {
    if (passVal == password) {
      setConfirmPassword(passVal);
      setShowConfirmError(false);
    } else {
      setShowConfirmError(true);
    }
  };

  return (
    <div>
      <h1>Football Club Svcollege</h1>
      <div className={styles.mainContainer}>
        <input
          type="text"
          placeholder="Username"
          onInput={(e) => setUserName(e.target.value)}
        />

        {showPasswordError ? <h4>wrong password</h4> : <></>}
        <input
          type="text"
          placeholder="Password"
          onInput={(e) => validatePassword(e.target.value)}
        />

        {showTeamError ? <h4>wrong team</h4> : <></>}
        <input
          type="text"
          placeholder="Team Name"
          onInput={(e) => validateTeam(e.target.value)}
        />

        {showConfirmError ? <h4>password doesnt match</h4> : <></>}
        <input
          type="text"
          placeholder="Confirm Password"
          onInput={(e) => validateConfirmPassword(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? createNewUser() : null)}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => createNewUser()}>Register</button>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    </div>
  );
}
