import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import styled from "styled-components"
import { ParticipantContext } from "./ParticipantContext"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"



const PairingPage = () => {

    const {fullLobby} = useContext(LobbyContext)

    const {loggedInUser} = useContext(UserContext)

    const [player1Score, setPlayer1Score] = useState(0)

    const [player2Score, setPlayer2Score] = useState(0)

    const [result, setResult] = useState()

    const [pairingArray, setPairingArray] = useState([])

    let pairing = []

    console.log(fullLobby)

    

    const buttonclicker = () => {
        const findPlayerTable = fullLobby.tables.map((table, index)=>{
        return table.includes(loggedInUser)
        })

        let tableIndex = findPlayerTable.indexOf(true)

        const findPlayerPairings = fullLobby.pairings.map((player)=>{
        return player[tableIndex].find((pairing)=>{
            return pairing.includes(loggedInUser)
        })
        }) 

        let currentPairing = findPlayerPairings

        for(var i=0; i<currentPairing[0].length*0.5; i++){
        pairing.push({username : currentPairing[0][i], startingScore: 0})
        }
        console.log(pairing)
      }


    console.log(pairing)

    // set this pairing array in previous page and pass through props. change the score here so that it can be sent to mongoDB

    const increaseScore = (index) => {
        let newResultsArray = [...result]
        console.log(newResultsArray)
    };

    const decreaseScore = (index) => {

    };
    


    return (
        <>
        <Section>
        <h2>Pairing Page</h2>
        <button onClick={buttonclicker}>click</button>
        <ScoreboardDiv>
            {/* {currentPairing && currentPairing.map((person, index)=>{
                return (
                    <>
                    <PlayerDiv key={index}>
                    <h3>{person[0]}</h3>
                    <ScoreDiv>
                    <button class="minus" onClick={() => {decreaseScore(0);}}>-</button>
                    <div>{result[0]}</div>
                    <button class="plus" onClick={() => {increaseScore(0);}}>+</button>
                    </ScoreDiv>
                    </PlayerDiv>
                    <PlayerDiv key={index+1}>
                    <h3>{result[1]}</h3>
                    <ScoreDiv>
                    <button class="minus" onClick={() => {decreaseScore(1);}}>-</button>
                    <div>{pairingArray[0][2]}</div>
                    <button class="plus" onClick={() => {increaseScore(1);}}>+</button>
                    </ScoreDiv>
                    </PlayerDiv>
                    </>
                )
            })} */}
        </ScoreboardDiv>
        </Section>
        </>
    )
}

export default PairingPage


const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`

const ScoreboardDiv = styled.div`
display: flex;
margin: 3rem;
`


const PlayerDiv = styled.div`
margin: 0rem 5rem;
display: flex;
flex-direction: column;
`


const ScoreDiv = styled.div`
display: flex;
`

