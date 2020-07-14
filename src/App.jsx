import React from "react";
import NavBar from "./components/NavBar";
import Authenticate from "./components/Authenticate";
import Home from "./components/Home";
import Loading from "./components/Loading";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authentication: "null",
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("user");
    if (!token) return;
    if (token !== "null") this.setState({ authentication: token });
    else this.setState({ authentication: "null" });
  }

  userAuthentication = (token) => {
    localStorage.setItem("user", token);
    this.setState({ authentication: token });
  };

  render() {
    return (
      <>
        <div className="flex-container">
          {this.state.authentication === "null" ? (
            <>
              <NavBar show="false" />
              <div className="container mb-0 mb-sm-4 flex-container-child">
                <Loading />
                <Authenticate authenticate={this.userAuthentication} />
              </div>
            </>
          ) : (
            <>
              <NavBar authenticate={this.userAuthentication} show="true" />
              <Loading />
              <Home authenticate={this.userAuthentication} />
            </>
          )}
        </div>
      </>
    );
  }
}
