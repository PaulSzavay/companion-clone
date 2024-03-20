import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './GlobalStyles';
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage';
import Lifetracker from './Components/Lifetracker';
import Options from './Components/Options';
import DiceRoll from './Components/DiceRoll';
import CoinFlip from './Components/CoinFlip';

const App = () => {
  return (
    <>
    <GlobalStyles />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/lifetracker" element={<Lifetracker/>}/>
        <Route path="/options" element={<Options />}/>
        <Route path="/diceroll" element={<DiceRoll />}/>
        <Route path="/coinflip" element={<CoinFlip />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
