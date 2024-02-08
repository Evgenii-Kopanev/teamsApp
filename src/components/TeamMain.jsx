import React, { useContext, useState } from "react";
import { TeamContext } from "../contexts/context";
import ShowAll from "./ShowAll";

export default function TeamMain() {
  const { currentUser } = useContext(TeamContext);
  const [isShown, setIsShown] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  console.log("🚀 ~ TeamMain ~ inputValue:", inputValue);

  return (
    <div>
      <h1>{`TEAM:${currentUser.team.name}`}</h1>
      <input
        type="text"
        placeholder="Enter your search"
        onInput={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setIsShown((prevState) => !prevState)}>
        Show all players
      </button>
      {isShown ? <ShowAll inputValue={inputValue} /> : <></>}
    </div>
  );
}
