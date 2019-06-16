import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderForm from "./components/HeaderForm";
import RedirectionsList from "./components/RedirectionsList";
import Redirector from "./components/Redirector";

// declare and export component
export default class App extends React.Component {
  //use construtor if you want to do something prior to componenDidMount
  // state own by the component
  state = {
    isLoading: true, // to toggle when loading is done
    redirections: [] //array all of existing redirections
  };

  //retrieve all current redirections that exist on the server side :
  async componentDidMount() {
    //Debug: check components has been used:
    /*  console.log(
      "componentDidMount has been called from ",
      this.constructor.name
    ); */

    axios
      .get(`https://short-url-back-florent-argod.herokuapp.com/redirection`)
      .then(response => {
        //Debug: check response content:
        // console.log(response.data);

        this.setState({
          redirections: response.data, //pu
          isLoading: false // loading done
        });
      });
  }

  // Update component state when a user submit a new url to short
  handleSubmit = newRedirection => {
    console.log("handleSubmit has been called from App");
    let nextRedirections = [newRedirection, ...this.state.redirections];
    this.setState({ redirections: nextRedirections });
  };

  //render App :)
  render() {
    if (this.state.isLoading) {
      console.log("loading");
      // anything you want to render before loading end
      return null;
    }
    // anything you want to render after loading
    const { redirections } = this.state; //destructuring in case code evolution and growing state
    return (
      <Router>
        <div>
          {/*  <div>Je suis le composant {this.constructor.name}</div> use for debug at the origin*/}
          <HeaderForm onSubmit={this.handleSubmit} />
        </div>
        <Route
          exact
          path="/"
          render={() => {
            return <RedirectionsList redirections={redirections} />; // display redirections list
          }}
        />
        <Route path="/:fromUrlKey" component={Redirector} />
      </Router>
    );
  }
}
