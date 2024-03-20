import styled from "styled-components";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import ChooseNumberOfPlayers from "./ChooseNumberOfPlayers";
import Options from "./Options";
import AreYouSure from "./AreYouSure";
import { useLocation } from "react-router-dom";

const Lifetracker = () => {

    const location = useLocation();
    const data = location.state

  const [alert, setAlert] = useState(false)

  const [numberOfPlayers, setNumberOfPlayers] = useState("");

  const [playerArray, setPlayerArray] = useState([]);

  const [menuOpened, setMenuOpened] = useState(false);

  
    useEffect(() => {
        if(data){
        setPlayerArray(data.playerArray)
        setNumberOfPlayers(data.numberOfPlayers)
        }
      }, []);

  const decreaseLife = (index) => {
    let newPlayerArray = [...playerArray];
    let currentPlayer = newPlayerArray[index];
    if (currentPlayer.startingLife !== 0) {
      currentPlayer.startingLife -= 1;
      setPlayerArray(newPlayerArray);
    }
  };

  const increaseLife = (index) => {
    let newPlayerArray = [...playerArray];
    let currentPlayer = newPlayerArray[index];
    currentPlayer.startingLife += 1;
    setPlayerArray(newPlayerArray);
  };

  const menu = () => {
    setMenuOpened(!menuOpened);
  };


  return (
    <>
      <LifetrackerSection>
        {alert ? < AreYouSure alert={alert} setAlert={setAlert} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} playerArray={playerArray} setPlayerArray={setPlayerArray}/> : <>
        {menuOpened ? (
          <Options menuOpened={menuOpened} setMenuOpened={setMenuOpened} alert={alert} setAlert={setAlert} numberOfPlayers={numberOfPlayers} playerArray={playerArray} />
        ) : (
          <>
            <h2>Lifetracker</h2>
            {playerArray.length > 0 &&
              playerArray.map((player, index) => {
                return (
                  <Player1 key={index}>
                    <Title>{player.playerName}</Title>
                    <Lifetotal>
                      <button
                        onClick={() => {
                          decreaseLife(index);
                        }}
                      >
                        <Minus />
                      </button>
                      <div>{player.startingLife}</div>
                      <button
                        onClick={() => {
                          increaseLife(index);
                        }}
                      >
                        <Plus />
                      </button>
                    </Lifetotal>
                  </Player1>
                );
              })}
            {!menuOpened && <button onClick={menu}>Menu</button>}
            {numberOfPlayers && numberOfPlayers !== 0 ? null : (
              <ChooseNumberOfPlayers
                numberOfPlayers={numberOfPlayers}
                setNumberOfPlayers={setNumberOfPlayers}
                playerArray={playerArray}
                setPlayerArray={setPlayerArray}
              />
            )}
          </>
        )}
        </>}
      </LifetrackerSection>
    </>
  );
};

export default Lifetracker;

const LifetrackerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Player1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid black;
`;

const Player2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid black;
`;

const Title = styled.h3``;

const Lifetotal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
