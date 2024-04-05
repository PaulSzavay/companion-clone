import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import { ParticipantContext } from "./ParticipantContext"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"


const EventLobby = () => {

    const { currentLobby, setCurrentLobby, fullLobby, setFullLobby } = useContext(LobbyContext)

    const { currentParticipant, setCurrentParticipant, fetchData } = useContext(ParticipantContext)

    const { currentUser, setCurrentUser, loggedInUser, setLoggedInUser } = useContext(UserContext)

    const [error, setError] = useState("")

    const [joined, setJoined] = useState(false)

    const [owner, setOwner] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
      }, [fetchData]);
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
            console.log(parsed)
        })
        .catch((error) => {
          console.error(error);
        });
    }


    const startEvent = () => {
        // lets try randomizing the players array
        if(fullLobby.players.length > 5){
        fetch("/api/startevent", {
            method: "POST",
            body: JSON.stringify( {currentLobby} ),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status===200){
                    fetchData()
                    setCurrentLobby(parsed.findLobby.lobbyId)
                    setFullLobby(parsed.findLobby)
                    navigate("/eventhost")
                }
            })
            .catch((error) => {
              console.error(error);
            });}
            else{
                setError("Not enough players to start event")
            }
    }


    const removeError = () => {
        setError("")
    }

    return (
        <>
        <h2>Current Lobby</h2>
        {fullLobby && <h2>{fullLobby.phase}</h2>}
        {fullLobby && <h2>{currentLobby}</h2>}
        {joined && <button>Leave Event</button>}
        {owner && <button onClick={deleteLobby}>Delete Event</button>}
        {owner && 
        <>
        {fullLobby.players.map((player, index)=>{
            return(
                <p>Player {index+1}: {player}</p>
            )
        })}

        <button onClick={startEvent}>Start Event</button>
        </>
        }
        <Section>
        {error && <ErrorDiv>
            <XButton onClick={removeError}>X</XButton>
            <p>{error}</p>
        </ErrorDiv>
        }
        </Section>
        </>
    )
}

export default EventLobby



const ErrorDiv = styled.div`
border: 0.1rem solid black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 10rem;
padding: 1rem;
width: 50rem;
`

const XButton = styled.button`
margin-left: 15rem;
font-size: 1rem;
padding: 0.5rem;
height: 2.5rem;
width: 2.5rem;
`

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
`