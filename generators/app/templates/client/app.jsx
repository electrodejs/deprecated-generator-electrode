//
// This is the client side entry point for the React app.
//

import React from "react";
import {render} from "react-dom";
import {routes} from "./routes";
import {Router, browserHistory} from "react-router";
import {createStore} from "redux";
import {Provider} from "react-redux";
import "./styles/base.css";
import rootReducer from "./reducers";

// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
<% if (pwa) { %>
require.ensure(["./sw-register"], (require) => {
  require("./sw-register")();
}, "sw-register");
<% } %>
window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState);
  render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );
};
