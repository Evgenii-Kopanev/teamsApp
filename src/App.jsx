import "./App.css";
import Login from "./views/Login";
import { Routes, Route } from "react-router-dom";
import { TeamContext } from "./contexts/context";
import Team from "./views/Team";
import Register from "./views/Register";
import { useState } from "react";
import AddPlayer from "./views/AddPlayer";
import EditPlayer from "./views/EditPlayer";

const initialState = [
  {
    userName: "Evgenii",
    password: "123456",
    team: {
      name: "Bobik",
      players: [
        {
          id: 1,
          name: "tal",
          age: 24,
          goals: 2,
          assists: 4,
          inLineUp: true,
        },
        {
          id: 2,
          name: "Dan",
          age: 21,
          goals: 5,
          assists: 1,
          inLineUp: false,
        },
      ],
    },
  },
];
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  console.log("🚀 ~ App ~ currentUser:", currentUser);

  const [userNamesList, setUserNamesList] = useState(initialState);
  console.log("🚀 ~ App ~ userNamesList:", userNamesList);

  const [playerID, setPlayerID] = useState(3);

  return (
    <>
      <TeamContext.Provider
        value={{
          playerID,
          setPlayerID,
          currentUser,
          setCurrentUser,
          userNamesList,
          setUserNamesList,
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/team/:teamName" element={<Team />} />
          <Route path="/team/:teamName/add" element={<AddPlayer />} />
          <Route path="/team/:teamName/edit" element={<EditPlayer />} />
        </Routes>
      </TeamContext.Provider>
    </>
  );
}

export default App;
