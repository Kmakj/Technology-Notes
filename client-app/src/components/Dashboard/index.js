import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class Dashboard extends Component {
  render() {
    return <div>Dashboard</div>;
  }
}

export default connect(mapStateToProps)(Dashboard);
