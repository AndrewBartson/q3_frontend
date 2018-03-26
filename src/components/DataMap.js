import d3 from 'd3';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import objectAssign from 'object-assign';

class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.datamap = null;
    this.state = {
      states_summary: [] 
    };
    this.getSummaryList();
  }

  linearPalleteScale(value){
    const dataValues = this.state.states_summary.map(function(data) { return data.margin });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    return d3.scale.linear().domain([minVal, maxVal]).range(["#f00", "#00f"])(value);
  }

  reduceData(){
    let temp = '';
    const newData = this.state.states_summary.reduce((object, data) => {
      if (data.group === 1) temp = '#aa0129'
      if (data.group === 2) temp = '#f64d52'
      if (data.group === 3) temp = '#fa8386'
      if (data.group === 4) temp = '#ffb9b9'
      if (data.group === 5) temp = '#b7d4f1'
      if (data.group === 6) temp = '#7fbfff'
      if (data.group === 7) temp = '#3085d3'
      if (data.group === 8) temp = '#0050aa'
      object[data.code] = { 
        value: data.group, 
        margin: data.margin, 
        electoral_votes: data.electoral_votes, 
        fillColor: temp }; //this.linearPalleteScale(data.margin) };
      return object;
    }, {});
    return objectAssign({}, this.state.states_summary, newData);
  }

  renderMap(states_summary){
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.reduceData(),
      geographyConfig: {
        borderWidth: 1.2,
        borderColor: '#fff',
        highlightFillColor: '#39ff14',
        popupTemplate: function(geography, data) {
          if (states_summary) {
            return `<div class="hoverinfo"><strong>
              ${geography.properties.name},  
              ${data.electoral_votes} electoral votes</strong></div>`;
          } else {
            return `<div class="hoverinfo"><strong>
              ${geography.properties.name}</strong></div>`;
          }
        }
      }
    });
  }

  getSummaryList() {
    axios.get("http://localhost:3002/summary")
      .then(response => {
        this.setState({
          states_summary: response.data.states_summary
        });
        this.renderMap(this.reduceData())
      })
      .catch(console.error);
  }

  currentScreenWidth(){
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }
  componentDidMount(){
    const mapContainer = d3.select('#datamap-container');
    const initialScreenWidth = this.currentScreenWidth();
    const containerWidth = (initialScreenWidth < 1200) ?
      { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
      { width: '1200px', height: '700px' }

    mapContainer.style(containerWidth);
    //this.datamap = this.renderMap(this.state.states_summary);
    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (this.currentScreenWidth() > 1200 && mapContainerWidth !== '1200px') {
        d3.select('svg').remove();
        mapContainer.style({
          width: '1200px',
          height: '700px'
        });
        this.datamap = this.renderMap('whatsup');
      }
      else if (this.currentScreenWidth() <= 1200) {
        d3.select('svg').remove();
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
        });
        this.datamap = this.renderMap('heelo');
      }
    });
  }
  componentDidUpdate(){
    //this.datamap.updateChoropleth(this.state.states_summary);
  }
  componentWillUnmount(){
    d3.select('svg').remove();
  }

  render() {
    return (
      <div id="datamap-container"></div>
    );
  }
}

export default DataMap;
