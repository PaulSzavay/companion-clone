import { useState } from "react"
import styled from "styled-components"


const ChooseNumberOfPlayers = ({numberOfPlayers, setNumberOfPlayers, playerArray, setPlayerArray}) => {

    const [dropdown, setDropdown] = useState(false)


    const activate = () => {
        setDropdown(!dropdown)
    }

const selectNumber = (e) =>{
    if(parseInt(e.target.value) === 2){
    setNumberOfPlayers(parseInt(e.target.value))
    let playerOrder = []
    for(var i=0; i<e.target.value; i++){
        playerOrder.push({number:i+1, playerName:`Player${i+1}`, startingLife: 20})
    }
    setPlayerArray(playerOrder)
    setDropdown("remove")}
    else{
        setNumberOfPlayers(parseInt(e.target.value))
        let playerOrder = []
        for(var i=0; i<e.target.value; i++){
            playerOrder.push({number:i+1, playerName:`Player${i+1}`, startingLife: 40})
        }
        setPlayerArray(playerOrder)
        setDropdown("remove")
    }
}



    return (
        <>
        {dropdown !== "remove" &&
        <>
        <p>how many?</p>
        <Dropdown>
            <DropdownButton onClick={activate}>How Many Players?</DropdownButton>
            <DropdownContent>
            {dropdown &&
            <>
                <DropdownOption onClick={selectNumber} value={2}>2</DropdownOption>
                <DropdownOption onClick={selectNumber} value={3}>3</DropdownOption>
                <DropdownOption onClick={selectNumber} value={4}>4</DropdownOption>
            </>
            }
            </DropdownContent>
        </Dropdown>
        </>
        }
        </>
    )
}

export default ChooseNumberOfPlayers


/* The container <div> - needed to position the dropdown content */
const Dropdown = styled.div`
    position: relative;
    display: inline-block;
` 

/* Dropdown Button */
const DropdownButton = styled.button` 
    background-color: #280274;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    position: relative;

&:hover{
    background-color: #4102bf;
}

/* &:hover .dropdown-content{
        display:block;
    } */
`

  /* Dropdown Content (Hidden by Default) */
const DropdownContent = styled.div`
    display: block;
    position: absolute;
    background-color: #f1f1f1;


`

  /* Links inside the dropdown */
const DropdownOption = styled.button`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    width: 10.875rem;

&:hover{
    background-color: #ddd;
}
`
