import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './Header/Header';
import Homepage from './Homepage';
import Lifetracker from './Lifetracker';
import Options from './Options';
import DiceRoll from './DiceRoll';
import CoinFlip from './CoinFlip';
import Profiles from './Profiles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import EventLobby from './EventLobby';
import JoinEvent from './JoinEvent';
import EventOwnerPage from './EventOwnerPage';
import PairingPage from './PairingPage';

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
