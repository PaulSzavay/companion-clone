import styled from "styled-components"


const ChooseNumberOfPlayers = ({numberOfPlayers, setNumberOfPlayers, playerArray, setPlayerArray}) => {

const selectNumber = (e) =>{
    setNumberOfPlayers(parseInt(e.target.value))
    let playerOrder = []
    for(var i=0; i<e.target.value; i++){
        playerOrder.push({number:i+1, playerName:`Player${i+1}`, startingLife: 20})
    }
    setPlayerArray(playerOrder)
}


    return (
        <>
        <p>how many?</p>
        <Dropdown>
            <DropdownButton>Dropdown</DropdownButton>
            <DropdownContent>
                <DropdownOption onClick={selectNumber} value={1}>1</DropdownOption>
                <DropdownOption onClick={selectNumber} value={2}>2</DropdownOption>
                <DropdownOption onClick={selectNumber} value={3}>3</DropdownOption>
                <DropdownOption onClick={selectNumber} value={4}>4</DropdownOption>
            </DropdownContent>
        </Dropdown>
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
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;

&:hover{
    background-color: #3e8e41;
}

/* &:hover .dropdown-content{
        display:block;
    } */
`

  /* Dropdown Content (Hidden by Default) */
const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f1f1f1;


${Dropdown}:hover & {
    display: block;

}
`

  /* Links inside the dropdown */
const DropdownOption = styled.button`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

&:hover{
    background-color: #ddd;
}
`
