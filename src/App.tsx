import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
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
      </Switch>
    </Router>
  )
}

export default App
