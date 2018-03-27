import React, { Component } from "react";
import DataMap from "./components/DataMap";
import SummaryList from "./components/SummaryList";
import "./css/table.css";
import dem_image from "./images/dem.jpg";
import gop_image from "./images/gop.jpg";
import states_summary from "./tempData";
import Modal from "./components/Modal";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      modalProps: {
        regionData: states_summary,
        emptyRegions: [],
        sortState: { key: 'regionName', direction: 'ASC' }
      }
    };
  }

  setModalProps = (newModalProps) => {
    console.log(this);
      this.setState({ modalProps: newModalProps })
      console.log("HEY WHATS UP");
    }

  render() {
    return (
      <div className="datamap-outer-conainer">
        <h1>
           <img src={gop_image} height="55" width="64" />
          U.S. Presidential Election 2016
          <img src={dem_image} height="55" width="64" />
          </h1>
        <DataMap />
        <SummaryList />
      </div>
    );
  }
}

export default App;

