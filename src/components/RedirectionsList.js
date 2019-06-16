import React from "react";

// declare and export component
export default class RedirectionsList extends React.Component {
  //use construtor if you want to do something prior to componenDidMount
  // state own by the component
  state = {
    isLoading: true // to toggle when loading is done
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

  // render table with original URL | shorten URL | visits
  render() {
    if (this.state.isLoading) {
      // anything you want to render before loading end
      return null;
    }
    // anything you want to render after loading
    const { redirections } = this.props;
    return (
      <div className="redirections-list-container">
        {/* <div>Je suis le composant {this.constructor.name}</div> */}
        <table className="redirections-list-content">
          <tbody>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Visits</th>
            </tr>
            {redirections.map((redirection, i) => {
              return (
                <tr key={i}>
                  <td>
                    <a href={redirection.toUrl}>{redirection.toUrl}</a>
                  </td>
                  <td>
                    <a href={redirection.fromUrlKey}>
                      {window.location.href + redirection.fromUrlKey}
                    </a>
                  </td>
                  <td>{redirection.visitsCounter}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
