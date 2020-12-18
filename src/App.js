import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import AddFilePage from "./pages/AddFilePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header/>

      <Router>
        <Switch>
          <Route path="/search-file" component={SearchPage}/>
          <Route path="/add-file" component={AddFilePage}/>
          <Route path="/" exact component={MenuPage}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
:root {
  --gradient: linear-gradient(to left, #ad5389, #3c1053);
  --buttonColor: #3C1053;
  --generalFont: 'Raleway', sans-serif;
  --titleFont: 'Risque', cursive;
  --titleFont2: 'Architects Daughter', cursive;
}

body {
  font-family: var(--generalFont);
  color: white;
  overflow:hidden;
}

#root {
  min-height: 100vh;
  width: 100%;
  background: var(--gradient);  
}

`;