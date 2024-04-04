import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LobbyContext } from "./LobbyContext"
import { UserContext } from "./UserContext"




const JoinEvent = () => {

    const navigate = useNavigate()

    const {currentLobby, setCurrentLobby} = useContext(LobbyContext)

    const {loggedInUser} = useContext(UserContext)

    const [lobbyCode, setLobbyCode] = useState("")

    const eventIdInput = (e) => {
        setLobbyCode(e.target.value)
    }

    console.log(loggedInUser)

    const joinLobby = (e) => {
        e.preventDefault()
        fetch("/api/joinevent", {
            method: "POST",
            body: JSON.stringify({lobbyId:lobbyCode, username:loggedInUser}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    setCurrentLobby(parsed.lobbyId)
                    navigate("/eventlobby")
                }
            })
            .catch((error) => {
              window.alert(error);
            });
    }



    return (
        <>
        <p>join event</p>
        <form onSubmit={joinLobby}>
        <input onChange={(e)=>eventIdInput(e)}/>
        <button>submit</button>
        </form>

        </>
    )
}


export default JoinEvent