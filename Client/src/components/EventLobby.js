import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import { ParticipantContext } from "./ParticipantContext"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"


const EventLobby = () => {

    const { currentLobby, setCurrentLobby, fullLobby, setFullLobby } = useContext(LobbyContext)

    const { currentParticipant, setCurrentParticipant } = useContext(ParticipantContext)

    const { currentUser, setCurrentUser, loggedInUser, setLoggedInUser } = useContext(UserContext)

    const [joined, setJoined] = useState(false)

    const [owner, setOwner] = useState(false)

    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(fullLobby.players.includes(loggedInUser)){
    //         setJoined(true)
    //     }
    //     if(fullLobby.eventOwner.includes(loggedInUser)){
    //         setOwner(true)
    //     }
    // }, [fullLobby])

    useEffect(()=>{
    fetch("/api/checkIfPlayerOrOwner", {
        method: "POST",
        body: JSON.stringify({username:loggedInUser, lobbyId:currentLobby}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
            if(parsed.status === 200){
                setOwner(parsed.owner)
                setJoined(parsed.joined)
            }
         console.log(parsed)
        })
        .catch((error) => {
          window.alert(error);
        });

    }, [])


    const checkIfJoined = () => {
        
    }

    const deleteLobby = (event) => {
        event.preventDefault();
        fetch("/api/deleteevent", {
        method: "POST",
        body: JSON.stringify( {currentLobby} ),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.status===204){
            navigate("/")
            setCurrentLobby("")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <>
        <h2>Current Lobby</h2>
        {fullLobby && <h2>{currentLobby}</h2>}
        {joined && <button>leave</button>}
        {owner && <button onClick={deleteLobby}>delete lobby</button>}
        </>
    )
}

export default EventLobby