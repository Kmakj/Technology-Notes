import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class Login extends Component {
  render() {
    return <div>Login</div>;
  }
}

export default connect(mapStateToProps)(Login);
