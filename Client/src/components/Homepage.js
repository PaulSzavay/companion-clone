import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "./UserContext"




const Homepage = () => {


    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

    return (
        <>
        {!loggedInUser && <p>Signup or Signin to gain access to events</p>}
        {loggedInUser && <p>Join an event</p>}
        </>
    )
}

export default Homepage