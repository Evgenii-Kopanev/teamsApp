import React, { useContext, useState } from "react";
import { TeamContext } from "../contexts/context";
import styles from "../styles/addplayer.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddPlayer() {
  const {
    playerID,
    setPlayerID,
    currentUser,
    setCurrentUser,
    userNamesList,
    setUserNamesList,
  } = useContext(TeamContext);
  const [playerName, setPlayerName] = useState(null);
  const [playerAge, setPlayerAge] = useState(null);
  const [playerGoals, setPlayerGoals] = useState(null);
  const [playerAssists, setPlayerAssists] = useState(null);
  const [inLineUp, setInLineUp] = useState(false);
  const navigate = useNavigate();

  const createPlayer = () => {
    if (playerName && validateAge(playerAge) && playerGoals && playerAssists) {
      setPlayerID((prevState) => prevState + 1);
      const playerToCreate = {
        id: playerID,
        name: playerName,
        age: playerAge,
        goals: playerGoals,
        assists: playerAssists,
        inLineUp: inLineUp,
      };
      const currentUserClone = structuredClone(currentUser);
      currentUserClone.team.players.push(playerToCreate);
      setCurrentUser(currentUserClone);

      const userNamesListClone = structuredClone(userNamesList);
      const foundUserInList = userNamesListClone.find(
        (user) => currentUser.userName == user.userName
      );
      foundUserInList.team.players.push(playerToCreate);
      setUserNamesList(userNamesListClone);

      alert("player Added");
      navigate(`/team/${currentUser.team.name}`);
    } else {
      alert("player doesnt added!!!");
    }
  };

  const validateAge = (number) => {
    if (number >= 18 && number <= 60) {
      return true;
    } else {
      alert("Please enter a correct age");
      return false;
    }
  };
  const validateInLineUp = (value) => {
    if (value == "false") {
      let result = currentUser.team.players.filter((player) => player.inLineUp);
      if (result.length <= 11) {
        setInLineUp(true);
      } else {
        alert("already 11 players In Line Up");
      }
    } else {
      setInLineUp(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>{currentUser.team.name}</h1>
      <div className={styles.mainDiv}>
        <input
          type="text"
          placeholder="Name"
          onInput={(e) => {
            e.target.value.length > 0 ? setPlayerName(e.target.value) : null;
          }}
        />
        <input
          type="text"
          placeholder="Age"
          onInput={(e) => {
            e.target.value.length > 0
              ? setPlayerAge(Number(e.target.value))
              : null;
          }}
        />
        <input
          type="text"
          placeholder="Goals"
          onInput={(e) => {
            e.target.value.length > 0
              ? setPlayerGoals(Number(e.target.value))
              : null;
          }}
        />
        <input
          type="text"
          placeholder="Assists"
          onInput={(e) => {
            e.target.value.length > 0
              ? setPlayerAssists(Number(e.target.value))
              : null;
          }}
        />
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="inLineUp"
            id="inLineUp"
            value={inLineUp}
            onClick={(e) => validateInLineUp(e.target.value)}
          />
          <label htmlFor="inLineUp">inLineUp?</label>
        </div>
      </div>
      <div className={styles.btnDiv}>
        <button onClick={() => createPlayer()}>Add Player</button>
        <button onClick={() => navigate(`/team/${currentUser.team.name}`)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
