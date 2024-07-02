import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FormContextProvider } from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <FormContextProvider>
          <App />
        </FormContextProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
