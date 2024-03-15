import styled from "styled-components"
import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';
import ChooseNumberOfPlayers from "./ChooseNumberOfPlayers";

const Lifetracker = () => {

    const [startingLife, setStartingLife] = useState(20)

    const [startingLife2, setStartingLife2] = useState(20)

    const [startingLife3, setStartingLife3] = useState(20)

    const [startingLife4, setStartingLife4] = useState(20)

    const [numberOfPlayers, setNumberOfPlayers] = useState ('')

    const [playerArray, setPlayerArray] = useState([])

    const decreaseLife = (index) => {
        let newPlayerArray = [...playerArray];
        let currentPlayer = newPlayerArray[index];
        currentPlayer.startingLife -= 1;
        setPlayerArray(newPlayerArray);
    }

    const increaseLife = (index) => {
        let newPlayerArray = [...playerArray];
        let currentPlayer = newPlayerArray[index];
        currentPlayer.startingLife += 1;
        setPlayerArray(newPlayerArray);
    }

    
    // const decreaseLife2 = (e) => {
    //     console.log(e)
    //     setStartingLife2(startingLife2-1)
    // }

    // const increaseLife2 = () => {
    //     setStartingLife2(startingLife2+1)
    // }


    // const decreaseLife3 = (e) => {
    //     console.log(e)
    //     setStartingLife3(startingLife3-1)
    // }

    // const increaseLife3 = () => {
    //     setStartingLife3(startingLife3+1)
    // }

    
    // const decreaseLife4 = (e) => {
    //     console.log(e)
    //     setStartingLife4(startingLife4-1)
    // }

    // const increaseLife4 = () => {
    //     setStartingLife4(startingLife4+1)
    // }







    return (
        <>
            <LifetrackerSection>
                <h2>Lifetracker</h2>
                {playerArray.length > 0 && playerArray.map((player, index) => {
                    return(
                        <Player1 key={index}>
                        <Title>{player.playerName}</Title>
                        <Lifetotal>
                        <button onClick={() => {decreaseLife(index)}}><Minus /></button>
                        <div>{player.startingLife}</div>
                        <button onClick={() => {increaseLife(index)}}><Plus /></button>
                        </Lifetotal>
                        </Player1>
                    )
                })}
                {/* <Player1>
                    <Title>Player 1</Title>
                    <Lifetotal>
                    <button onClick={decreaseLife1}><Minus /></button>
                    <div>{startingLife}</div>
                    <button onClick={increaseLife1}><Plus /></button>
                    </Lifetotal>
                </Player1>
                <Player2>
                    <Title>Player 2</Title>
                    <Lifetotal>
                    <button onClick={decreaseLife2}><Minus /></button>
                    <div>{startingLife2}</div>
                    <button onClick={increaseLife2}><Plus /></button>
                    </Lifetotal>
                </Player2> */}
                <ChooseNumberOfPlayers numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} playerArray={playerArray} setPlayerArray={setPlayerArray}/>
            </LifetrackerSection>
        </>
    )
}

export default Lifetracker

const LifetrackerSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`


const Player1 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 0.1rem solid black;
`

const Player2 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 0.1rem solid black;
`

const Title = styled.h3`

`

const Lifetotal = styled.div`
display: flex;
justify-content: center;
align-items: center;
`