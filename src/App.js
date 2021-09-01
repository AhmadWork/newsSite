import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./app/Pages/Login"
import Signup from "./app/Pages/Signup"
import Dashboard from "./app/Pages/Dashboard"
import Article from "./app/Pages/Article"
import Navbar from "./components/Navbar"
import MyFav from "./app/Pages/MyFav"
function App() {

  return (
    <div className="App">
      <Router>
      <Navbar  />
        <Switch>
         <Route exact component={Dashboard} path="/" />
         <Route exact component={Article} path="/article" />
         <Route exact component={MyFav} path="/fav" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/signup" />
        </Switch>
      </Router>
    </div>
  )
}
export default App