import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Lifetracker from './components/Lifetracker';
import Options from './components/Options';
import DiceRoll from './components/DiceRoll';
import CoinFlip from './components/CoinFlip';
import Profiles from './components/Profiles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
