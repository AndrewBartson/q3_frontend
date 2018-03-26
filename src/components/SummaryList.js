import React from "react";
import StateSummary from "./StateSummary";
import axios from "axios";

class SummaryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states_summary: []
    };
  }

  componentDidMount() {
    this.getSummaryList();
  }

  getSummaryList() {
    axios
      .get("http://localhost:3002/summary")
      .then(response => {
        this.setState({
          states_summary: response.data.states_summary
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="data_nest">
        {this.state.states_summary.map((unit, i) => {
          return (
            <StateSummary
              regionName={unit.regionName}
              key={unit.id}
              id={unit.id}
              code={unit.code}
              value={unit.value}
              margin={unit.margin}
              group={unit.group}
              electoral_votes={unit.electoral_votes}
            />
          );
        })}
      </div>
    );
  }
}

export default SummaryList;
