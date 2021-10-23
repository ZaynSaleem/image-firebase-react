import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Index from "./pages/Home";
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import AddDetail from "./pages/Detail/add-detail";
import ShowDetail from "./pages/Detail/show-detail";


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  <Router>
    <Switch>
    <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/Index">
        <Index />
      </Route>
      <Route path="/add-detail">
        <AddDetail/>
      </Route>
      <Route path="/show-detail">
        <ShowDetail/>
      </Route>
    </Switch>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
