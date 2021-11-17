import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from './page/main';
import { LoginPage } from "./page/login";

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
      </Switch>
    </Router>
  )
}

export default App
