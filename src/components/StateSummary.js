import React from "react";

const StateSummary = ({regionName, code, electoral_votes, group, margin, value, id }) => {
  return (
<div className='data_row'>
  <h3 className="state_name">{regionName}</h3>
  <p>
    <div className="data_spot">Margin of victory  <span>{margin}%</span></div> 
    <div className="data_spot">Electoral votes <span>{electoral_votes}</span></div> 
  </p>
</div>
  );
};

export default StateSummary;


