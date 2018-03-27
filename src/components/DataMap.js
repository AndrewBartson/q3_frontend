import d3 from "d3";
import Datamap from "datamaps/dist/datamaps.usa.min";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import objectAssign from "object-assign";
import Modal from './Modal'
require('../images/dem.jpg')

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.datamap = null;
    this.state = {
      states_summary: []
    };
    this.getSummaryList();
  }

  linearPalleteScale(value) {
    const dataValues = this.state.states_summary.map(function(data) {
      return data.margin;
    });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    return d3.scale
      .linear()
      .domain([minVal, maxVal])
      .range(["#f00", "#00f"])(value);
  }

  reduceData() {
    let temp = "";
    const newData = this.state.states_summary.reduce((object, data) => {
      if (data.group === 1) { data.winner = 'R'; data.color = "#aa0129";}
      if (data.group === 2) { data.winner = 'R'; data.color = "#f64d52";}
      if (data.group === 3) { data.winner = 'R'; data.color = "#fa8386";}
      if (data.group === 4) { data.winner = 'R'; data.color = "#ffb9b9";}
      if (data.group === 5) { data.winner = 'D'; data.color = "#b7d4f1";}
      if (data.group === 6) { data.winner = 'D'; data.color = "#7fbfff";}
      if (data.group === 7) { data.winner = 'D'; data.color = "#3085d3";}
      if (data.group === 8) { data.winner = 'D'; data.color = "#0050aa";}
      object[data.code] = {
        value: data.group,
        margin: data.margin,
        electoral_votes: data.electoral_votes,
        fillColor: data.color
      }; //this.linearPalleteScale(data.margin) };
      return object;
    }, {});
    return objectAssign({}, this.state.states_summary, newData);
  }

  hoverDiv(strings, state, elect_votes, margin) {
    console.log('testing testing')
  }

  renderMap(states_summary) {
    const clickFunction = this.props.setModalProps
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: "usa",
      data: this.reduceData(),
      geographyConfig: {
        borderWidth: 1.2,
        borderColor: "#fff",
        highlightFillColor: "#39ff14",
        popupTemplate: function(geography, data) {

          let hoverDiv = `<div class="hoverinfo">
          <div class="box1 dude">
            <span id="fixTitle" class="label">${geography.properties.name}</span>
          </div>          
          <div class="box3">
            <span class="label">Margin of Victory</span>
            <span class="info">${data.margin}%</span>
          </div>
          <div class="box4">
            <span class="label">Electoral Votes</span>
            <span class="info">${data.electoral_votes}</span>
          </div>
        </div>`
          if (states_summary) {
            return hoverDiv;

          } else {
            return `<div class="hoverinfo"><span>
              ${geography.properties.name}</span></div>`;
          }
        }
      },
    responsive: false,
      done: (datamap) => {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
          clickFunction({state: true,
                         title: geography.properties.name,
                         data: []});
        });
      }
    });
  }

  getSummaryList() {
    axios
      .get("http://localhost:3002/summary")
      .then(response => {
        this.setState({
          states_summary: response.data.states_summary
        });
        this.renderMap(this.reduceData());
      })
      .catch(console.error);
  }

  currentScreenWidth() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
  componentDidMount() {
    const mapContainer = d3.select("#datamap-container");
    const initialScreenWidth = this.currentScreenWidth();
    const containerWidth =
      initialScreenWidth < 1200
        ? { width: initialScreenWidth + "px",
            height: initialScreenWidth * 0.5625 + "px" }:
          { width: "1200px", height: "700px" };

    mapContainer.style(containerWidth);
    //this.datamap = this.renderMap(this.state.states_summary);
    window.addEventListener("resize", () => {
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style("width");
      if (this.currentScreenWidth() > 1200 && mapContainerWidth !== "1200px") {
        d3.select("svg").remove();
        mapContainer.style({
          width: "1200px",
          height: "700px"
        });
        this.datamap = this.renderMap("whatsup");
      } 
      else if (this.currentScreenWidth() <= 1200) {
        d3.select("svg").remove();
        mapContainer.style({
          width: currentScreenWidth + "px",
          height: currentScreenWidth * 0.5625 + "px"
        });
        this.datamap = this.renderMap("heelo");
      }
    });
  }
  componentDidUpdate() {
    //this.datamap.updateChoropleth(this.state.states_summary);
  }
  componentWillUnmount() {
    d3.select("svg").remove();
  }

  render() {
    return (
      <div id="datamap-container"></div>
    );
  }
}

export default DataMap;
