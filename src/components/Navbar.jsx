import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { TeamContext } from "../contexts/context";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(TeamContext);
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <button onClick={() => navigate(`/team/${currentUser.team.name}`)}>
        Team
      </button>
      <button onClick={() => navigate(`/team/${currentUser.team.name}/add`)}>
        Add Player
      </button>
      <button onClick={() => navigate(`/team/${currentUser.team.name}/edit`)}>
        Edit Player
      </button>
      <button
        onClick={() => {
          navigate("/");
          setCurrentUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}
