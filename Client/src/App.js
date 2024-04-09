import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage';
import Lifetracker from './Components/Lifetracker';
import Options from './Components/Options';
import DiceRoll from './Components/DiceRoll';
import CoinFlip from './Components/CoinFlip';
import Profiles from './Components/Profiles';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import EventLobby from './Components/EventLobby';
import JoinEvent from './Components/JoinEvent';
import EventOwnerPage from './Components/EventOwnerPage';
import PairingPage from './Components/PairingPage';

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
        <Route path="/profile" element={<Profile />}/>
        <Route path="/eventlobby" element={<EventLobby />}/>
        <Route path="/joinevent" element={<JoinEvent />}/>
        <Route path="/eventhost" element={<EventOwnerPage />}/>
        <Route path="/pairingpage" element={<PairingPage />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
