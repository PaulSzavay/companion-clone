import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";



const SignUp = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const { currentUser, setCurrentUser, setLoggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) 
    {navigate("/")}
  }, [currentUser]);

  // fetch (post) to push user info into database
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify({ name, username, email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed)
        if (parsed.status === 201) {
          localStorage.setItem("user", JSON.stringify(parsed.data.email));
          setCurrentUser(parsed.data.email)
        //   setLoggedInUser(parsed.data.name)
          navigate("/")
        } else if (parsed.status === 400) {
          setErrorMessage("Email is already taken. Please choose a different email.");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };


    return (
        <>
        <SignUpSection>
        <h2>Sign Up Form</h2>
        <Form onSubmit={handleSubmit}>
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