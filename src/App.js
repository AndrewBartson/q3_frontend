import React, { Component } from "react";
import DataMap from "./components/DataMap";
import SummaryList from "./components/SummaryList";
import "./css/table.css";

class App extends Component {

  render() {
    return (
      <div className="datamap-outer-conainer">
        <DataMap />
        <SummaryList />
      </div>
    );
  }
}

export default App;
