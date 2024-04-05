import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import styled from "styled-components"
import { ParticipantContext } from "./ParticipantContext"





const EventOwnerPage = () => {

const {currentLobby, setCurrentLobby, fullLobby, setFullLobby} = useContext(LobbyContext)

const {currentParticipant, fetchData} = useContext(ParticipantContext)

useEffect(() => {
    fetchData();
  }, [fetchData]);

console.log(currentParticipant.find((lobby)=>{return(lobby.lobbyId === currentLobby)}))


    return (
        <>
        <Section>        
            <Title>Event Owner Page</Title>
                {fullLobby.tables &&
                <Div>
                    {fullLobby.tables.map((table, index)=>{
                        const half = Math.ceil(table.length / 2);
                        const topHalf = table.slice(0, half);
                        const bottomHalf = table.slice(half);
                        return(
                            <>
                                <TableContainer key={index}>
                                    <OutsideTop>
                                        {topHalf && topHalf.map((person, index) => (
                                        <Person key={index}>{person}</Person>
                                        ))}
                                    </OutsideTop>
                                    <OutsideBottom>
                                        {bottomHalf && bottomHalf.map((person, index) => (
                                        <Person key={index}>{person}</Person>
                                        ))}
                                    </OutsideBottom>
                                </TableContainer>
                            </>
                        )
                    })}
                </Div>}
                {!fullLobby.tables && <p>....loading</p>}
                <button>Continue to Round 1</button>
        </Section>
        </>
    )
}


export default EventOwnerPage

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
height: 110vh;

`


const Title = styled.h2`
margin: 3rem 0 10rem;
`


const Div = styled.div`
display: grid;
grid-template-columns: 1fr 1fr; 
grid-gap: 300px; 
margin-bottom: 10rem;
`

const TableContainer = styled.div`
position: relative;
width: 650px;
height: 250px; /* Adjust height as needed */
border: 1px solid black;
`;


const OutsideTop = styled.div`
position: absolute;
top: -70px; /* Adjust the distance from the table */
width: 100%;
display: flex;
justify-content: space-between;
padding: 0 20px; /* Adjust padding to align with table */
`;


const Person = styled.div`
margin: 5px;
border: 1px solid black;
padding: 1rem;
`;


const OutsideBottom = styled.div`
position: absolute;
bottom: -70px; /* Adjust the distance from the table */
width: 100%;
display: flex;
justify-content: space-between;
padding: 0 20px; /* Adjust padding to align with table */
`;