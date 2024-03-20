import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"




const Options = ({menuOpened, setMenuOpened, alert, setAlert, numberOfPlayers, playerArray}) => {

    const navigate = useNavigate()

    const close = () => {
        setMenuOpened(!menuOpened)
    }

    const reset = () => {
        setAlert(!alert)
    }

    const data = {numberOfPlayers: numberOfPlayers, playerArray:playerArray}

    const roll = () => {
        navigate('/diceroll', {state:data});
    }

    
    const flip = () => {
        navigate('/coinflip', {state:data});
    }

    const home = () => {
        navigate('/')
    }


    return (
        <>
        <OptionSection>
            <CloseButton onClick={close}>X</CloseButton>
            <MenuTitle>Options</MenuTitle>
            <Menu>
                <MenuComponents><MenuButton>Setup</MenuButton></MenuComponents>
                <MenuComponents><MenuButton>Profiles</MenuButton></MenuComponents>
                <MenuComponents><MenuButton onClick={reset}>Reset</MenuButton></MenuComponents>
                <MenuComponents><MenuButton onClick={roll}>Roll</MenuButton></MenuComponents>
                <MenuComponents><MenuButton onClick={flip}>Flip</MenuButton></MenuComponents>
                <MenuComponents><MenuButton onClick={home}>Home</MenuButton></MenuComponents>
            </Menu>
        </OptionSection>
        </>
    )
}

export default Options


const OptionSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 1rem;
box-sizing: border-box;
`

const MenuTitle = styled.h3`
`


const CloseButton = styled.button`
margin-left: 50%;
`


const Menu = styled.ul`
padding: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const MenuComponents = styled.li`
text-decoration: none;
list-style: none;
`


const MenuButton = styled.button`
padding: 0.5rem;
margin: 0.5rem;
`