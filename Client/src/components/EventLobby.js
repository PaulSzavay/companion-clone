import styled from "styled-components"
import { useContext } from "react"
import { LobbyContext } from "./LobbyContext"
import { ParticipantContext } from "./ParticipantContext"
import { UserContext } from "./UserContext"


const EventLobby = () => {

    const { currentLobby, setCurrentLobby, fullLobby, setFullLobby } = useContext(LobbyContext)

    const { currentParticipant, setCurrentParticipant } = useContext(ParticipantContext)

    const { currentUser, setCurrentUser, loggedInUser, setLoggedInUser } = useContext(UserContext)

    console.log(fullLobby)

    let joined = ""

    const checkIfJoined = () => {
        
    }

    const leaveLobby = () => {

    }

    return (
        <>
        <h2>Current Lobby</h2>
        <h2>{fullLobby.lobbyId}</h2>
        <button>leave</button>
        <button>delete lobby</button>
        </>
    )
}

export default EventLobby