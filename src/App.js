import React, { Component } from "react";
import DataMap from "./components/DataMap";

class App extends Component {
  render() {
    return (
      <div className="datamap-outer-conainer">
        <DataMap regionData={this.props.regionData} />
      </div>
    );
  }
}

export default App;
