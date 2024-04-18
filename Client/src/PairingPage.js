import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import styled from "styled-components"
import { ParticipantContext } from "./ParticipantContext"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"



const PairingPage = () => {

    const {fullLobby, currentLobby, setCurrentLobby} = useContext(LobbyContext)

    const {loggedInUser} = useContext(UserContext)

    const [player1Score, setPlayer1Score] = useState(0)

    const [player2Score, setPlayer2Score] = useState(0)

    const navigate = useNavigate();

    let pairing = []

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

    const increaseScore1 = () => {
        if(player1Score < 2){
        setPlayer1Score(player1Score + 1)}
    };

    const decreaseScore1 = () => {
        if(player1Score > 0){
        setPlayer1Score(player1Score - 1)}
    };
    
    const increaseScore2 = () => {
        if(player2Score < 2){
        setPlayer2Score(player2Score + 1)}
    };

    const decreaseScore2 = () => {
        if(player2Score > 0){
        setPlayer2Score(player2Score - 1)}
    };
    
    const submitResults = () => {
            const findPlayerTable = fullLobby.tables.map((table, index)=>{
            return table.includes(loggedInUser)
            })
    
            let tableIndex = findPlayerTable.indexOf(true)
    
            const findPlayerPairings = fullLobby.pairings.map((player)=>{
            return player[tableIndex].find((pairing)=>{
                return pairing.includes(loggedInUser)
            })
            }) 


            console.log(...findPlayerPairings)

            let temporaryPairings = [...findPlayerPairings]
            temporaryPairings[0][2] = player1Score;
            temporaryPairings[0][3] = player2Score;
            
            let newPairings = temporaryPairings[0]

            fetch("/api/scorereporting", {
                method: "POST",
                body: JSON.stringify( {currentLobby, loggedInUser, newPairings} ),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((parsed) => {
                    console.log(parsed)
                })
                .catch((error) => {
                  console.error(error);
                })

    }

    const hostNavigate = () => {
        navigate("/hostpairingmenu")
    }


    return (
        <>
        <Section>
        <h2>Pairing Page</h2>
        <button onClick={buttonclicker}>click</button>
        <ScoreboardDiv>
                    <>
                    <PlayerDiv >
                    <h3>Player 1</h3>
                    <ScoreDiv>
                    <button className="minus" onClick={() => {decreaseScore1();}}>-</button>
                    <input type="number" value={player1Score}/>
                    <button className="plus" onClick={() => {increaseScore1();}}>+</button>
                    </ScoreDiv>
                    </PlayerDiv>
                    <PlayerDiv>
                    <h3>Player 2</h3>
                    <ScoreDiv>
                    <button className="minus" onClick={() => {decreaseScore2();}}>-</button>
                    <input type="number" value={player2Score}/>
                    <button className="plus" onClick={() => {increaseScore2();}}>+</button>
                    </ScoreDiv>
                    </PlayerDiv>
                    </>
        </ScoreboardDiv>
        <button onClick={submitResults}>Submit</button>
        <button onClick={hostNavigate}>Host Pairing Menu</button>
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

