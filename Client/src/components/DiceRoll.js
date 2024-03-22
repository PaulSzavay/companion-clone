import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";


const DiceRoll = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state

    const [diceDropdown, setDiceDropdown] = useState(false)

    const [diceSelected, setDiceSelected] = useState([])

    const [diceRolled, setDiceRolled] = useState(false)

    const [disabled, setDisabled] = useState(false)

    const DiceInformation = [
        {name:"d4", image:"image1", sides:4},
        {name:"d8", image:"image2", sides:8},
        {name:"d10", image:"image3", sides:10},
        {name:"d12", image:"image4", sides:12},
        {name:"d20", image:"image5", sides:20},
    ]

    const lifetracker = () => {
        navigate('/lifetracker', {state: data})
    }

    const dropdownClick = () => {
        setDiceDropdown(!diceDropdown)
    }
    
    const displayDice = (index) => {
        if(!disabled){
        let currentDice = DiceInformation[index];
        setDiceSelected([...diceSelected, currentDice])
    }
    }

    let diceTotal = []    
    let sum = 0
        
    diceSelected.forEach((dice) => {
            diceTotal.push(dice.roll)
        })

    for(let i=0; i<diceTotal.length; i++){
            sum += diceTotal[i]
        }


    const rollDice = () => {
        (diceSelected.forEach((dice, index)=>{
            let newDiceSelected = [...diceSelected];
            let currentDice = newDiceSelected[index];
            let currentDiceRoll = (Math.floor(1 + Math.random()*(dice.sides)));
            currentDice["roll"] = currentDiceRoll;
            setDiceSelected(newDiceSelected)
            setDiceRolled(true)
            setDisabled(true)
        }))
    }

    const reset = () => {
        setDiceSelected([])
        setDiceRolled(false)
        setDisabled(false)
    }


    return (
        <>
        <DiceRollSection>
        <h2> Dice Rolls </h2>
        <button onClick={lifetracker}>Return to Game</button>
        <DiceRollingSection>
            <ImagesOfDice>
                {diceSelected.length > 0 && 
                diceSelected.map((dice, index) => {
                    return(
                        <>
                        <SomeDiv key={index}>
                        <Dice>{dice.name}</Dice>
                        {diceRolled && <p>{dice.roll}</p>}
                        </SomeDiv>
                        </>
                    )
                })
                }
            </ImagesOfDice>
            <Total>{diceRolled && <p>Total: {sum}</p>}</Total>
            
            <DiceButtonDiv>
            {DiceInformation.map((dice, index)=>{
                return (
                <>
                <button onClick={() => displayDice(index)}>{dice.name}</button>
                </>
            )})}
            </DiceButtonDiv>
            <RollButtonDiv>
            {diceSelected.length > 0 && <button onClick={rollDice}>{diceRolled ? "Reroll" : "Roll"}</button>}
            {diceRolled && <button onClick={reset}>Reset</button>}
            </RollButtonDiv>
        </DiceRollingSection>
        </DiceRollSection>
        </>
    )
}

export default DiceRoll


const DiceRollSection = styled.section`
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;
height: 1500px;
`

const Linkto = styled(Link)`
color:black;
`


const DiceRollingSection = styled.section`
`


const ImagesOfDice = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Dice = styled.p`
margin: 1rem;
`


const DiceButtonDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 1rem 0 0 0;
`

const RollButtonDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 1rem 0 0 0;
`

const SomeDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Total = styled.div`
display: flex;
justify-content: center;
align-items: center;
`