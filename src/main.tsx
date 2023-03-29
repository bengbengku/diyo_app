import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
const store = createStore(rootReducer, composeWithDevTools());
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider
    theme={{
      colorScheme: "light",
      breakpoints: {
        xs: "480",
        sm: "768",
        md: "1060",
      },
      primaryColor: "red",
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <Provider store={store}>
      <Router>
        <Notifications />
        <App />
      </Router>
    </Provider>
  </MantineProvider>
);
