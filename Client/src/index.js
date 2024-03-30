import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './Components/UserContext';
import { LobbyProvider } from './Components/LobbyContext';
import { ParticipantProvider } from './Components/ParticipantContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LobbyProvider>
      <UserProvider>
        <ParticipantProvider>
          <App />
        </ParticipantProvider>
      </UserProvider>
    </LobbyProvider>
  </React.StrictMode>
);


