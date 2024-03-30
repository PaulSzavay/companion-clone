import { createContext, useState, useEffect } from "react";

export const LobbyContext = createContext(null);

export const LobbyProvider = ({children}) => {

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
    console.log(parsed)
    if(parsed.status === 200){
      localStorage.setItem("lobby", JSON.stringify(parsed.data.lobbyId))
      setCurrentLobby(parsed.data.lobbyId)
      setFullLobby(parsed.data)
    }
    })
  .catch((error) => {
      console.log(error)
  })
},[currentLobby]);

console.log(currentLobby)

// passing currentLobby, setCurrentLobby to all children
  return (
    <LobbyContext.Provider value={{currentLobby, setCurrentLobby, fullLobby, setFullLobby}}>
            {children}
    </LobbyContext.Provider>
  )

};