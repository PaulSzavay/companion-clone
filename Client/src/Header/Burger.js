import styled from "styled-components";
import Nav from "./Nav";



const Burger = ({open, changeOpenValue}) => {

    return(
        <>
        <Hamburger open={open} onClick={changeOpenValue}>
            <div />
            <div />
            <div />
        </Hamburger>
        <Nav open={open} changeOpenValue={changeOpenValue}/>
        </>
    )
}

export default Burger

const Hamburger = styled.div`
width: 3rem;
height: 3rem;
top: 2rem;
right: 4.5rem;
display: none;
z-index: 4;

@media only screen and (max-width: 1000px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
}


div{
    width: 3rem;
    height: 0.3rem;
    background-color: #280274;
    border-radius: 1rem;
    transform-origin:0.1rem;

    &:nth-child(1) {
        transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
        transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
        opacity: ${({open}) => open ? 0 : 1};
    }

    &:nth-child(3) {
        transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
}
`