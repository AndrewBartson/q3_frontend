import React, { Component } from "react";
import DataMap from "./components/DataMap";
import SummaryList from "./components/SummaryList";
import "./css/table.css";
import states_summary from "./tempData"
import Modal from "./components/Modal"

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
    console.log("this.state");
    return (
      <div className="datamap-outer-conainer">
        <DataMap setModalProps={this.setModalProps}/>
        <SummaryList />
        <Modal modalProps={this.state.modalProps} />
      </div>
    );
  }
}

export default App;
