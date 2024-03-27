import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"


const Profiles = () => {

    const [playerArray, setPlayerArray] = useState([])

    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state

    useEffect(()=>{
        setPlayerArray(data.playerArray)
    }, [])

    const [name, setName] = useState("")

    const inputChange = (e, index) => {
        setName(e.target.value)
    }

    const submit = (e, index) => {
        e.preventDefault();
        let temporaryArray = [...playerArray]
        let temporaryPlayer = temporaryArray[index]
        temporaryPlayer.playerName = `${name}`
        setPlayerArray(temporaryArray)
    }

    const newData = {numberOfPlayers:data.numberOfPlayers, playerArray}

    const lifetracker = () => {
        navigate('/lifetracker', {state: newData})
    }


    return (
        <>
        <ProfilesSection>
        <h3> profiles </h3>
        {data && data.playerArray.map((player, index)=>{
            return(
                <>
                <Form key={index} onSubmit={(e)=>submit(e, index)}>
                <ChangeName onChange={(e)=>inputChange(e, index)} type="text" id="name" placeholder={player.playerName} />
                <button>Change Name</button>
                </Form>
                
                </>
            )
        })}
        
        <button onClick={lifetracker}>Return to game</button>
        </ProfilesSection>
        </>
    )
}

export default Profiles

const ProfilesSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
height: 1500px;
`

const ChangeName = styled.input`
display: flex;
text-align: center;
padding: 1rem;
font-size: 1.5rem;
color:black;
margin: 1rem;
border: 0.15rem solid black;
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`