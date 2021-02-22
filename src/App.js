import logo from './logo.svg';
import './App.css';
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import SpotifyPlayer from 'react-spotify-web-playback';

import Background from "./components/background"

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

function App() {
  const token = Cookies.get('spotifyAuthToken')
  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <SpotifyPlayer
            token={token}
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
          />
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/callback'
          clientID='dd5dfb68d8254d1d9b7e748c23feb083'
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.streaming, Scopes.userReadPlaybackState, Scopes.userModifyPlaybackState]} // either style will work
        />
      )}
      <Background/>
    </div>
  );
}

export default App;
