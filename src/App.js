import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Portfolio from './components/Portfolio/Portfolio';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Stream from './components/Stream/Create/Stream';
import Streams from './components/Stream/Streams/Streams';
import StreamDetails from './components/Stream/Watch/StreamDetails';
import Home from './components/Home/Home';
import Tournement from './components/Tournement/Tournement';
import Tournements from './components/Tournements/Tournements';
import Tourbracket from './components/Tourbracket/Tourbracket';
import TourbracketStreams from './components/Tourbracket/Streams';
import Games from './components/Games/Games';
import Search from './components/Utils/Search';
import CreateGame from './components/Games/Create/Game';
import GameDetails from './components/Games/GameDetails/GameDetails';
import Events from './components/Events/Events';
import Reset from './components/ResetPassword/Reset';
import Donation from './components/Donation/Donation';
import changePass from './components/Profile/ChangePassword'
import logo from './assets/images/logo.png';



import { Success } from './components/SocialAuth/Success';

import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'




function App() {
  const token = localStorage.getItem("accessToken");
  const history = useHistory();
  useEffect(() => {
    history.listen((location) => {
      window.location.reload();
    })


  }, [history])



  if (!token) {

    return (
      <Router>
        <Switch>
          <Route exact path="/">

            <Portfolio />

          </Route>
          <Route exact path="/reset-password">
          <a href="/"><img src={logo} className="mainlogo" alt="Modern Stream" /></a>

            <Reset />
          </Route>
          <Route exact path="/signup">
          <a href="/"><img src={logo} className="mainlogo" alt="Modern Stream" /></a>

            <SignUp />
          </Route>
          
          <Route exact path="/signup">

            <Donation />
          </Route>
          <Route exact path="/success" component={Success} />
          <Redirect to="/" />



        </Switch>
      </Router>
    );
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/home" /></Route>

        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/streams" component={Streams} />
        <Route exact path="/stream" component={Stream} />
        <Route exact path="/streams/watch" component={StreamDetails} />
        <Route exact path="/tournement" component={Tournement} />
        <Route exact path="/tournements" component={Tournements} />
        <Route exact path="/tournements/tourbracket" component={Tourbracket} />
        <Route exact path="/tournements/streams" component={TourbracketStreams} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/game/create" component={CreateGame} />
        <Route exact path="/games/details" component={GameDetails} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/donation" component={Donation} />
        <Route exact path="/change-pass" component={changePass} />
      </Switch>
    </Router>
  );

}

export default App
