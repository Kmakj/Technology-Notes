import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class Article extends Component {
  render() {
    return <div>Article</div>;
  }
}

export default connect(mapStateToProps)(Article);
