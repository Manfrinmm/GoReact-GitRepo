import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Switch -> Garante que apenas uma rota seja chamada por momento
//exact -> Garante que apenas a rota com o mesmo path seja chamada

import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/repository/:repo" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
