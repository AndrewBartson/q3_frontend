import React from "react";
import StateSummary from "./StateSummary";

class SummaryList extends React.Component {
  render() {
    return (
      <div className="data_nest">
        {this.props.states_summary.map((unit, i) => {
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
