import { useContext, useEffect, useState } from "react"
import { LobbyContext } from "./LobbyContext"
import styled from "styled-components"
import { ParticipantContext } from "./ParticipantContext"
import { useNavigate } from "react-router-dom"





const EventOwnerPage = () => {

const {currentLobby, setCurrentLobby, fullLobby, setFullLobby} = useContext(LobbyContext)

const {currentParticipant, fetchData} = useContext(ParticipantContext)

    const navigate = useNavigate()

useEffect(() => {
    fetchData();
  }, [fetchData]);

const pairing = () => {
    navigate("/pairingpage")
}

    return (
        <>
        <Section>        
            <Title>Event Owner Page</Title>
            {fullLobby &&
                <Div>
                    {fullLobby.tables ? fullLobby.tables.map((table, index)=>{
                        const half = Math.ceil(table.length / 2);
                        const topHalf = table.slice(0, half);
                        const bottomHalf = table.slice(half).reverse();
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
                    })
                    : 
                        <Loading>
                            <p>...loading</p>
                        </Loading>
                }
                </Div>}
                {fullLobby.tables && <Button onClick={pairing}>Continue to Round 1</Button>}
        </Section>
        </>
    )
}


export default EventOwnerPage

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`


const Title = styled.h2`
margin: 3rem;
`


const Div = styled.div`
/* display: grid;
grid-template-columns: 1fr 1fr; 
grid-gap: 300px; 
margin-bottom: 10rem; */
display:flex;
flex-direction: column;
`

const TableContainer = styled.div`
position: relative;
width: 650px;
height: 250px; /* Adjust height as needed */
border: 1px solid black;
margin: 8rem;
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


const Loading = styled.div`
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    margin: 10rem;
`