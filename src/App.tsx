import React from "react";
import "./App.css";
import { HomePage } from "./HomePage/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CountryPage } from "./CountryPage/CountryPage";
function App() {
  //Have a context for all the countries, so you have easy access to country slug and Provinces
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/country/:countrySlug">
          <CountryPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
