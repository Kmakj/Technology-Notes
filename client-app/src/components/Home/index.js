import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends Component {
  render() {
    return <div />;
  }
}

export default connect(mapStateToProps)(Home);
