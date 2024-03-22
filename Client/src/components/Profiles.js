import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"


const Profiles = () => {

    const location = useLocation()

    const data = location.state

    const [name, setName] = useState("")

    const inputChange = (e, index) => {
        setName(e.target.value)
    }

    const submit = (e, index) => {
        e.preventDefault();
    }


    return (
        <>
        <ProfilesSection>
        <h3> profiles </h3>
        {data.playerArray.map((player, index)=>{
            return(
                <>
                <Form key={index}>
                <ChangeName onChange={(e)=>inputChange(e, index)} type="text" id="name" placeholder={player.playerName} />
                <button onSubmit={(e)=>submit(e, index)}>Submit</button>
                </Form>
                </>
            )
        })}
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