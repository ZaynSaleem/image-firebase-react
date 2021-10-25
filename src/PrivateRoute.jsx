import React from "react";
import { Redirect } from "react-router";

export default function PrivateRoute({ component: Component }) {
  let get = JSON.parse(localStorage.getItem("user-sign-in"));
  console.log({ get });
  if (get) {
    return <Component /> ;
  } else {
    return <Redirect to="/" />;
  }
}
