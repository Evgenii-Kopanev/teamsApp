import React, { useContext, useState } from "react";
import { TeamContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";
import styles from "../styles/editPlayer.module.css";
import Navbar from "../components/Navbar";

export default function EditPlayer() {
  const { currentUser, setCurrentUser, userNamesList, setUserNamesList } =
    useContext(TeamContext);
  const [playerName, setPlayerName] = useState(null);
  console.log("🚀 ~ EditPlayer ~ playerName:", playerName);

  const [playerAge, setPlayerAge] = useState(null);
  console.log("🚀 ~ EditPlayer ~ playerAge:", playerAge);

  const [playerGoals, setPlayerGoals] = useState(null);
  console.log("🚀 ~ EditPlayer ~ playerGoals:", playerGoals);

  const [playerAssists, setPlayerAssists] = useState(null);
  console.log("🚀 ~ EditPlayer ~ playerAssists:", playerAssists);

  const [inLineUp, setInLineUp] = useState(false);
  console.log("🚀 ~ EditPlayer ~ inLineUp:", inLineUp);

  const [playerId, setPlayerId] = useState();
  console.log("🚀 ~ EditPlayer ~ playerId:", playerId);

  //------------------
  const [selection, setSelection] = useState("");
  console.log("🚀 ~ EditPlayer ~ selection:", selection);

  const navigate = useNavigate();

  const savePlayer = () => {
    if (playerName && validateAge(playerAge) && playerGoals && playerAssists) {
      const playerToSave = {
        id: playerId,
        name: playerName,
        age: playerAge,
        goals: playerGoals,
        assists: playerAssists,
        inLineUp: inLineUp,
      };
      const currentUserClone = structuredClone(currentUser);
      const foundedIndex = currentUserClone.team.players.findIndex(
        (player) => player.id == playerToSave.id
      );
      currentUserClone.team.players.splice(foundedIndex, 1, playerToSave);
      setCurrentUser(currentUserClone);

      const userNamesListClone = structuredClone(userNamesList);
      const foundUserInList = userNamesListClone.find(
        (user) => currentUser.userName == user.userName
      );
      foundUserInList.team.players.splice(foundedIndex, 1, playerToSave);
      setUserNamesList(userNamesListClone);

      alert("player changed");
      navigate(`/team/${currentUser.team.name}`);
    } else {
      alert("player doesnt changed!!!");
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
        setSelection({ ...selection, inLineUp: true });
      } else {
        alert("already 11 players In Line Up");
      }
    }
    if (value == "true") {
      setInLineUp(false);
      setSelection({ ...selection, inLineUp: false });
    }
  };
  const valid = (event) => {
    const foundPlayer = currentUser.team.players.find(
      (player) => player.name == event
    );
    setSelection(foundPlayer);
    setPlayerName(foundPlayer.name);
    setPlayerAge(foundPlayer.age);
    setPlayerGoals(foundPlayer.goals);
    setPlayerAssists(foundPlayer.assists);
    setInLineUp(foundPlayer.inLineUp);
    setPlayerId(foundPlayer.id);
  };

  return (
    <div>
      <Navbar />
      <h1>{currentUser.team.name}</h1>
      <select
        name="playerSelect"
        id="playerSelect"
        value={selection.name}
        onChange={(e) => valid(e.target.value)}
      >
        <option disabled selected>
          -- select an option --
        </option>
        {currentUser.team.players.map((player, index) => (
          <option value={player.name} key={index}>
            {player.name}
          </option>
        ))}
      </select>
      <br />
      <hr />
      <div className={styles.mainDiv}>
        <input
          type="text"
          placeholder="Name"
          defaultValue={selection.name}
          onInput={(e) => {
            e.target.value.length > 0 ? setPlayerName(e.target.value) : null;
          }}
        />
        <input
          type="text"
          placeholder="Age"
          defaultValue={selection.age}
          onInput={(e) => {
            e.target.value.length > 0
              ? setPlayerAge(Number(e.target.value))
              : null;
          }}
        />
        <input
          type="text"
          placeholder="Goals"
          defaultValue={selection.goals}
          onInput={(e) => {
            e.target.value.length > 0
              ? setPlayerGoals(Number(e.target.value))
              : null;
          }}
        />
        <input
          type="text"
          placeholder="Assists"
          defaultValue={selection.assists}
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
            checked={selection.inLineUp}
            onClick={(e) => validateInLineUp(e.target.value)}
          />
          <label htmlFor="inLineUp">inLineUp?</label>
        </div>
      </div>
      <div className={styles.btnDiv}>
        <button onClick={() => savePlayer()}>Save</button>
        <button onClick={() => navigate(`/team/${currentUser.team.name}`)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
