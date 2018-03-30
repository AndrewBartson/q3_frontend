import React, { Component } from "react";
import DataMap from "./components/DataMap";
import "./css/table.css";
import dem_image from "./images/dem2.jpg";
import gop_image from "./images/gop2.jpg";
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
      <div className="banner">
        <div id="gop" className="side_box"><img src={dem_image}
             alt="elephant icon" /></div>
          <div className="title_box"><h1>U.S. Presidential Election 2016</h1></div>
          <div className="side_box"><img src={gop_image} 
            alt="donkey icon" /></div>         
        </div>
        <DataMap states_summary={this.state.states_summary} setModalProps={this.setModalProps}/>
        <Modal modalProps={this.state.modalProps} />
      </div>
    );
  }
}

export default App;
