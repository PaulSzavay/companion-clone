import styled from "styled-components"
import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"
import { LobbyContext } from "./LobbyContext"
import { ParticipantContext } from "./ParticipantContext"




const Homepage = () => {

    const navigate = useNavigate();

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

    const { currentLobby, setCurrentLobby, fullLobby } = useContext(LobbyContext)

    const { currentParticipant, setCurrentParticipant } = useContext(ParticipantContext)


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

    // const checkLobbies = () => {
    //     fetch("/api/checklobbies", {
    //         method: "POST",
    //         body: JSON.stringify({username:loggedInUser}),
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((parsed) => {
    //         if(parsed.status === 200 ){
    //             function removeDuplicates(arr1, arr2) {
    //                 // Create a set of _ids from arr2 for efficient lookup
    //                 const idsSet = new Set(arr2.map(obj => obj._id));
                    
    //                 // Filter arr1 to keep only those objects whose _id is not in idsSet
    //                 const filteredArr1 = arr1.filter(obj => !idsSet.has(obj._id));
                
    //                 // Return the combined unique set
    //                 return filteredArr1.concat(arr2);
                    
    //             }
    //         const uniqueArray = removeDuplicates(parsed.events.ownerArray, parsed.events.playerArray);
    //         }
    //     })
    //     .catch((error) => {
    //         window.alert(error);
    //     });
    // }

    const returnToLobby = (e) => {

        const findLobby = currentParticipant.find((lobby)=>{
            return(lobby.lobbyId === e.target.value)
        })
        console.log(findLobby)
        if(findLobby.phase === "Enrolling"){
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