import { useState } from "react";
import styled from "styled-components"



const SignUp = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")


    return (
        <>
        <SignUpSection>
        <h2>Sign Up Form</h2>
        <Form>
            <LabelDiv>
                <Label>Name: </Label>
            </LabelDiv>
            <InputDiv>
                <Input 
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}/>
            </InputDiv>
            <LabelDiv>
                <Label>Username: </Label>
            </LabelDiv>
            <InputDiv>
                <Input
                type="text"
                id="userName"
                onChange={(e) => setUsername(e.target.value)}/>
            </InputDiv>
            <LabelDiv>
                <Label>Email: </Label>
            </LabelDiv>
            <InputDiv>
                <Input 
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}/>
            </InputDiv>
            <LabelDiv>
                <Label>Password: </Label>
            </LabelDiv>
            <InputDiv>
                <Input 
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}/>
            </InputDiv>
            <Button>SignUp</Button>
        </Form>
        </SignUpSection>
        </>
    )
}

export default SignUp


const SignUpSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
height: 1000px;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const InputDiv = styled.div`

`

const LabelDiv = styled.div`

`


const Label = styled.label`

`

const Input = styled.input`

`


const Button = styled.button`
`