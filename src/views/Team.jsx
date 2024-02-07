import React, { useContext } from "react";
import { TeamContext } from "../contexts/context";
import Navbar from "../components/Navbar";
import TeamMain from "../components/TeamMain";

export default function Team() {
  const { currentUser } = useContext(TeamContext);

  return (
    <div>
      <Navbar />
      <TeamMain />
    </div>
  );
}
