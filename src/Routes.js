import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Payment from "./pages/Payment";
import AllClasses from "./pages/AllClasses";
import EachClass from "./pages/EachClass";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Layout>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/classes" component={AllClasses} />
          <Route exact path="/students/:studentId" component={EachClass} />
        </Layout>
      </Switch>
    </Router>
  );
}
