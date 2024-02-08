import React, { useContext } from "react";
import { TeamContext } from "../contexts/context";

export default function ShowAll({ inputValue }) {
  const { currentUser } = useContext(TeamContext);
  let filtered = currentUser.team.players.filter((player) =>
    player.name.includes(inputValue)
  );
  console.log("🚀 ~ ShowAll ~ filtered:", filtered);

  let final;
  if (filtered.length == 0) {
    final = currentUser.team.players;
  }
  if (filtered.length > 0) {
    final = filtered;
  }
  return (
    <div>
      {final.map((player, index) => (
        <div key={index}>
          <h4>player name: {player.name}</h4>
          <h4>player age: {player.age}</h4>
          <h4>player goals: {player.goals}</h4>
          <h4>player assists: {player.assists}</h4>
          <h4>is player in-line-up? {player.inLineUp ? "yes" : "no"}</h4>
        </div>
      ))}
    </div>
  );
}
