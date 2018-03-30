import React, { Component } from "react";
import DataMap from "./components/DataMap";
import SummaryList from "./components/SummaryList";
import "./css/table.css";
import dem_image from "./images/dem.jpg";
import gop_image from "./images/gop.jpg";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      states_summary: [],
      modalProps: {}
      }
    };
  

  componentDidMount() {
    this.getSummaryList()
  }

  getSummaryList() {
    axios
      .get("http://localhost:3002/summary")
      .then(response => {
        console.log(response)
        this.setState({
          states_summary: response.data
        });
      })
      .catch(console.error);
  }

  setModalProps = (newModalProps) => {
      this.setState({ modalProps: newModalProps })
    }

  render() {
    return (
      <div className="datamap-outer-conainer">
        <h1>
           <img src={gop_image} alt="elephant icon" height="55" width="64" />
          U.S. Presidential Election 2016
          <img src={dem_image} alt="donkey icon" height="55" width="64" />
        </h1>
        <DataMap states_summary={this.state.states_summary} setModalProps={this.setModalProps}/>
        <SummaryList states_summary={this.state.states_summary} />
        <Modal modalProps={this.state.modalProps} />
      </div>
    );
  }
}

export default App;
