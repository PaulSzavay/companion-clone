import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './GlobalStyles';
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage';
import Lifetracker from './Components/Lifetracker';

const App = () => {
  return (
    <>
    <GlobalStyles />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/lifetracker" element={<Lifetracker/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
