import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class ProfilePage extends Component {
  render() {
    return <div>ProfilePage</div>;
  }
}

export default connect(mapStateToProps)(ProfilePage);
