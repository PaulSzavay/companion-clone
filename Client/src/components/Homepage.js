import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"
import { LobbyContext } from "./LobbyContext"
import { ParticipantContext } from "./ParticipantContext"




const Homepage = () => {

    const navigate = useNavigate();

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

    const { currentLobby, setCurrentLobby, fullLobby } = useContext(LobbyContext)

    const { currentParticipant, setCurrentParticipant, fetchData } = useContext(ParticipantContext)


    useEffect(() => {
        fetchData();
      }, [fetchData]);


    const createEvent = () => {
        fetch("/api/createevent", {
            method: "POST",
            body: JSON.stringify({username:loggedInUser}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 201){
                    setCurrentLobby(parsed.lobbyId)
                    navigate("/eventlobby")
                }
            })
            .catch((error) => {
              window.alert(error);
            });
    }

    const returnToLobby = (e) => {
        fetchData();
        const findLobby = currentParticipant.find((lobby)=>{
            return(lobby.lobbyId === e.target.value)
        })
        if(findLobby.phase === "Enrolling" || findLobby.eventOwner !== loggedInUser){
        setCurrentLobby(e.target.value)
        navigate("/eventlobby")
        }
        else{
        setCurrentLobby(e.target.value)
        navigate("/eventhost")
        }
    }

    const joinEvent = (e) => {
        navigate("/joinevent")
    }

    return (
        <>
        {!loggedInUser && <p>Signup or Signin to gain access to events</p>}
        {loggedInUser && <button onClick={createEvent}>Create an event</button>}
        {loggedInUser && <button onClick={joinEvent}>Join an event</button>}
        {/* <button onClick={checkLobbies}>Check Lobbies</button> TO BE DELETED */}
        {currentParticipant && currentParticipant.map((lobbies, index)=>{
            return(
                <>
                {index < 8 &&
                <>
                <p key={index}>Lobby {index+1}</p>
                <button value={lobbies.lobbyId} onClick={returnToLobby}>{lobbies.lobbyId}</button>
                </>
                }
                {index > 8 &&
                <>
                    <p>Leave some lobbies to see more</p>
                </>
                }
                </>
            )
                    })
        }
        </>
    )
}

export default Homepage