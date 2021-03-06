import React from "react";
import axios from "axios";

// declare and export component
export default class Redirector extends React.Component {
  //use construtor if you want to do something prior to componenDidMount
  // state own by the component
  state = {
    isLoading: true, // to toggle when loading is done
    redirection: {}
  };

  async componentDidMount() {
    //Debug: check components has been used:
    console.log(
      "componentDidMount has been called from ",
      this.constructor.name
    );
    const { fromUrlKey } = this.props.match.params;
    //console.log("Key", fromUrlKey);

    // existency and visits count update
    try {
      const response = await axios.post(
        "https://short-url-back-florent-argod.herokuapp.com/redirection/update",
        {
          fromUrlKey: fromUrlKey
        }
      );
      this.setState({
        isLoading: false, // loading done
        redirection: response.data // set redirection info
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        isLoading: false // loading done
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      // anything you want to render before loading end
      return null;
    }
    // anything you want to render after loading
    console.log("mon url", this.state.redirection.toUrl);
    return (
      <div>
        => redirecting to :
        {this.state.redirection.toUrl
          ? (window.location.href = this.state.redirection.toUrl)
          : (window.location.href =
              "https://short-url-florent-argod.herokuapp.com/")}
      </div>
    );
  }
}
