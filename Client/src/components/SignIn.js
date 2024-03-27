import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";


const SignIn = () => {

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
    fetch("/api/finduser", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          localStorage.setItem("user", JSON.stringify(parsed.data.email));
          setCurrentUser(parsed.data.email)
          setLoggedInUser(parsed.data.username)
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
        <SignInSection>
        <h2>Sign Up Form</h2>
        <Form onSubmit={handleSubmit}>
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
            <Button>SignIn</Button>
        </Form>
        </SignInSection>
        </>
    )
}


export default SignIn 


const SignInSection = styled.section`
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