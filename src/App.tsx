import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from './page/main';
import { LoginPage } from "./page/login";
import { CreateRoomPage } from './page/create';
import { FightPage } from './page/fight';

function App() {

  useEffect(() => {
    location.hash = '/login';
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/hall">
          <MainPage></MainPage>
        </Route>
        <Route path="/create">
          <CreateRoomPage></CreateRoomPage>
        </Route>
        <Route path="/fight">
          <FightPage></FightPage>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
