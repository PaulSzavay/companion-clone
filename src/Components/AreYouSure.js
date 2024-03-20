import { useNavigate } from "react-router-dom"


const AreYouSure = ({alert, setAlert, numberOfPlayers, setNumberOfPlayers, playerArray, setPlayerArray}) => {

    const navigate = useNavigate();

    const yes = () => {
        window.location.reload()
        navigate('/lifetracker', {})
    }

    const no = () => {
        setAlert(!alert)
    }

    return (
        <>
        <h2> are you sure? </h2>
        <button onClick={yes}>yes</button>
        <button onClick={no}>no</button>
        </>
    )
}

export default AreYouSure