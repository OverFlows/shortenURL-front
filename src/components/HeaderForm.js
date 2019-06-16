import React from "react";
import axios from "axios";

// declare and export component
export default class HeaderForm extends React.Component {
  //use construtor if you want to do something prior to componenDidMount
  // state own by the component
  state = {
    isLoading: true, // to toggle when loading is done
    url: "" //input url
  };

  async componentDidMount() {
    //Debug: check components has been used:
    /*  console.log(
      "componentDidMount has been called from ",
      this.constructor.name
    ); */
    this.setState({
      isLoading: false // loading done
    });
  }

  //update submit on this from :
  handleSubmit = async e => {
    e.preventDefault();

    //create a new entry in the DB
    try {
      const response = await axios.post(
        "https://short-url-back-florent-argod.herokuapp.com/redirection/create",
        {
          toUrl: this.state.url
        }
      );

      console.log(response);
      let newRedirection = response.data;
      // action up ! to update the caller state (App)
      this.props.onSubmit(newRedirection);

      //alert(`creation d'une nouvelle url ${this.state.url}`);
    } catch (error) {
      console.log(error);
      // alert("Une erreur est survenue.");
    }
  };

  render() {
    if (this.state.isLoading) {
      console.log("loading");
      // anything you want to render before loading end
      return null;
    }
    // anything you want to render after loading
    return (
      <div className="header-form-container">
        {/*  <div>Je suis le composant {this.constructor.name}</div> */}
        <div className="header-form-content">
          <h1>Simplify your URL</h1>
          <form
            className="header-form-content-from"
            onSubmit={this.handleSubmit}
          >
            <input
              className="header-form-url"
              type="url"
              value={this.state.url}
              name="url"
              placeholder="Your original URL here"
              onChange={e => this.setState({ url: e.target.value })}
            />
            <input
              className="header-form-button"
              type="submit"
              value="SHORTEN URL"
            />
          </form>
        </div>
      </div>
    );
  }
}
