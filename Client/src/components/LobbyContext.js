import { createContext, useState, useEffect, useContext } from "react";
import { ParticipantContext } from "./ParticipantContext";

export const LobbyContext = createContext(null);

export const LobbyProvider = ({children}) => {

    const {currentParticipant, setCurrentParticipant, fetchData} = useContext(ParticipantContext)

  const [currentLobby, setCurrentLobby] = useState(() => {

    let lobby = localStorage.getItem("lobby");
    
    if(lobby){
        return JSON.parse(lobby)
    }
    else{
        return null
    }
})

    const [fullLobby, setFullLobby] = useState()

useEffect(()=>{
  currentLobby && 
  fetch(`/api/lobby/${currentLobby}`)
  .then((response) => response.json())
  .then((parsed) => {
    if(parsed.status === 200){
      localStorage.setItem("lobby", JSON.stringify(parsed.data.lobbyId))
      setCurrentLobby(parsed.data.lobbyId)
      setFullLobby(parsed.data)
    }
    })
  .catch((error) => {
      console.log(error)
  })
},[currentParticipant]);


// passing currentLobby, setCurrentLobby to all children
  return (
    <LobbyContext.Provider value={{currentLobby, setCurrentLobby, fullLobby, setFullLobby}}>
            {children}
    </LobbyContext.Provider>
  )

};