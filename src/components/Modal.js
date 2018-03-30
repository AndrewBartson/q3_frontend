import React from 'react';
import "../css/table.css"

export default class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = { modalProps: this.props.modalProps };
  }
  render() {
    let cleanedData;
    if(this.props.modalProps.candidates) {
        cleanedData = this.cleanData(this.props.modalProps.candidates);
    }

    if(cleanedData) {
      return (
        <div id="modal">
          <div id="state" className="details"><h1>{cleanedData.winner.state}</h1></div>
          <div id="winner" className="details">
            <h2>{cleanedData.winner.party} </h2>
            <h3>Winner: {cleanedData.winner.presidentialCandidate} / {cleanedData.winner.vicePresidentialCandidate}</h3>
          </div>
          <div id="runnerUp" className="details">
            <h2>{cleanedData.runnerUp.party} </h2>
            <h3>Runner Up: {cleanedData.runnerUp.presidentialCandidate} / {cleanedData.runnerUp.vicePresidentialCandidate}</h3>
          </div>
          <div id="losers" className="details">
            <h3>Others</h3>
            <ul>
            {
              cleanedData.losers.map((row) => {
                return <li><span>{row.presidentialCandidate}</span> <span>Popular Vote </span><span>{row.popularVotePercentage} %</span><span></span></li>
              })
            }
            </ul>
          </div>
        </div>
      );
    } else {
      return <div id="modal"></div>
    }
  }
  cleanData(dataArray) {
    let winnerObj = dataArray.filter(row => row.winner)[0];
    let runnerUp;
    if(winnerObj.party == 'Republican') {
      runnerUp = dataArray.filter(row => row.party == 'Democrat')[0];
    } else if (winnerObj.party == 'Democrat') {
      runnerUp = dataArray.filter(row => row.party == 'Republican')[0];
    }
    let losers = dataArray.filter(row => Boolean(row.party != 'Democrat' && row.party != 'Republican'))
    return {winner: winnerObj,
            runnerUp: runnerUp,
            losers: losers}
  }
}
