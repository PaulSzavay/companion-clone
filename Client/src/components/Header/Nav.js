import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"

const Nav = ({open, changeOpenValue}) => {

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

    console.log({"currentUser":currentUser, setCurrentUser, loggedInUser, setLoggedInUser})


    return(
        <>
            <List open={open}>
                <li><Linkto onClick={changeOpenValue} to="/lifetracker">Lifetracker</Linkto></li>
                <li><Linkto onClick={changeOpenValue} to="/options">Options</Linkto></li>
                {loggedInUser && <li><Linkto onClick={changeOpenValue} to="/profile">Hello {loggedInUser}</Linkto></li>}
                {!loggedInUser && <li><Linkto onClick={changeOpenValue} to="/signin">SignIn</Linkto></li>}
                {!loggedInUser && <li><Linkto onClick={changeOpenValue} to="/signup">SignUp</Linkto></li>}
            </List>
        </>
    )
}

export default Nav


const List = styled.ul`
list-style: none;
display: flex;
margin: 0;
padding: 0;
z-index: 3;


@media only screen and  (max-width: 1000px) {
    flex-flow: column nowrap;
    background-color: #E9F6FF;
    position: fixed;
    top:4rem;
    right:0;
    height: 100vh;
    width: 100vw;
    padding: 1rem 1.5rem;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    overflow: ${({open}) => open ? 'auto' : 'hidden'};
}


li{
padding: 1.25rem 1rem;
font-size: 2rem;
position: static;
}
`

const Linkto = styled(Link)`
text-decoration: none;
color:#280274;

&:hover{
    text-decoration: underline;
    padding-bottom: 0.5rem;
}
`

