import { styled } from "styled-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Burger from "./Burger";

const Header = () => {

    const [open, setOpen] = useState(false)

    const changeOpenValueLogo = () => {
        if(open === true){
            setOpen(!open)
        }
    }
    const changeOpenValue = () => {
        setOpen(!open)
    }


    return(
        <>
        <Top>
            <Home to="/" onClick={changeOpenValueLogo}>LOGO</Home>
            <Title>Magic Companion</Title>
            <Burger open={open} changeOpenValue={changeOpenValue}/>
        </Top>
        </>
    )
}

export default Header


const Top = styled.div`
position:sticky;
width: 100%;
padding: 0.5rem 1rem;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #FE7A36;
z-index: 50;
`

const Title = styled.h2`
color: #280274;
margin-left: 8rem;
`


const Home = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
height: 80%;
`


