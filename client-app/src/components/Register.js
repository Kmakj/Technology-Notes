import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class Register extends Component {
  render() {
    return <div>Register</div>;
  }
}

export default connect(mapStateToProps)(Register);
