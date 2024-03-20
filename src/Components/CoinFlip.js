import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";


const CoinFlip = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state

    const [flipped, setFlipped] = useState(false)

    const [loading, setLoading] = useState(false)

    const [coinSide, setCoinSide] = useState("")

    const lifetracker = () => {
        navigate('/lifetracker', {state: data})
    }


    
    const flipCoin = () => {
        let flipValue = Math.floor(1 + (Math.random()*(2)))
        if(flipValue === 1){
            setCoinSide("Heads")
        }
        else if(flipValue === 2){
            setCoinSide("Tails")
        }
        setLoading(false)
        setFlipped(true)
    }

    const flipping = () => {
        setLoading(true)
        setTimeout(flipCoin, 500)
    }

    return (
        <>
        <CoinFlipSection>
            <h2>Coin Flip</h2>
            <button onClick={lifetracker}>Return to Game</button>
            <FlipButton onClick={flipping}>Flip a coin</FlipButton>
            {loading && <p>...coin is flipping...</p>}
            {flipped && !loading &&
            <p>{coinSide}</p>
            }
        </CoinFlipSection>
        </>
    )
}

export default CoinFlip


const CoinFlipSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
height: 1500px;
`

const FlipButton = styled.button`
margin-top: 1rem;
`

