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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AccountDetails from "./pages/AccountDetails";
import Payout from "./pages/Payout";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:userId/:toke" component={ResetPassword} />
        <Layout>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/classes" component={AllClasses} />
          <Route exact path="/payout" component={Payout} />  
          <Route exact path="/students/:studentId" component={EachClass} />
          <Route exact path="/account-details" component={AccountDetails} />  
        </Layout>
      </Switch>
    </Router>
  );
}
