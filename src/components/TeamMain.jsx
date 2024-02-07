import React, { useContext } from "react";
import { TeamContext } from "../contexts/context";

export default function TeamMain() {
  const { currentUser } = useContext(TeamContext);
  return (
    <div>
      <h1>{`TEAM:${currentUser.team.name}`}</h1>
      <input type="text" placeholder="Enter your search" />
      <button>Show all players</button>
    </div>
  );
}
