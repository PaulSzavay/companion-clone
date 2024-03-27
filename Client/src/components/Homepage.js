import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"




const Homepage = () => {

    const navigate = useNavigate();

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

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
                console.log(parsed)
            })
            .catch((error) => {
              window.alert(error);
            });
    }

    return (
        <>
        {!loggedInUser && <p>Signup or Signin to gain access to events</p>}
        {loggedInUser && <button onClick={createEvent}>Create an event</button>}
        {loggedInUser && <button>Join an event</button>}
        </>
    )
}

export default Homepage