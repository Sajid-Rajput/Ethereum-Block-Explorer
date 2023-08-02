import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import BlockTransactions from "./pages/blockTransactions";
import TransactionReceipt from "./pages/transactionReceipt";
import AccountBalance from "./pages/accountBalance";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/check-account-balance">Check Account Balance</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/block/:blockNumber"
            component={BlockTransactions}
          />
          <Route
            exact
            path="/block/:blockNumber/:transactionHash"
            component={TransactionReceipt}
          />
          <Route exact path="/check-account-balance" component={AccountBalance} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
