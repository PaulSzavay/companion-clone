import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import styled from "styled-components"
import { ParticipantContext } from "./ParticipantContext"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"



const HostPairingMenu = () => {

    const {fullLobby, currentLobby, setCurrentLobby} = useContext(LobbyContext)

    const {loggedInUser} = useContext(UserContext)

    console.log(fullLobby)

    const [currentTable, setCurrentTable] = useState()


    const initial = (index) => {
        setCurrentTable(index)
    }

    const increaseButton = (index) => {
        console.log(index)
}


    return (
        <>
        <Section>
        <h2>Host Pairing Page</h2>
            {fullLobby && fullLobby.pairings.map((pairing, index)=>{
                return (
                    <div>
                        {pairing.map((player, index)=>{
                            return (
                                <Tables>
                                    <div key={index} onClick={() => initial(index)}>
                                        {player.map((individual, index)=>{
                                        return(
                                            <ScoreboardDiv>
                                                <Players>
                                                <Player>{individual[0]}</Player>
                                                <Player>{individual[1]}</Player>
                                                </Players>
                                                <Scores key={index}>
                                                <button>-</button>
                                                {/* <Score value={individual[2]}></Score> */}
                                                <button onClick={() => increaseButton(index)}>+</button>
                                                <button>-</button>
                                                {/* <Score value={individual[3]}></Score> */}
                                                <button>+</button>
                                                </Scores>
                                            </ScoreboardDiv>
                                        )
                                        })}
                                    </div>
                                </Tables>



                            )
                        })}
                    </div>
                
                )
            })
            }
        </Section>
        </>
    )
}

export default HostPairingMenu


const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`

const Tables = styled.div`
border: 0.1rem solid black;
padding: 10rem;
`

const ScoreboardDiv = styled.div`
display: flex;
flex-direction: column;
`

const Players = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Player = styled.h2`
margin: 1rem;
`


const Scores = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Score = styled.input`
`