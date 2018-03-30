import React from 'react';

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
    console.log("CLEANED DATA")
    console.log(cleanedData);
    console.log("CURRENT STATE OF MODAL: ")
    console.log(this.props.modalProps);
    if(cleanedData) {
      return (
        <div id="modal">
          <div id="winner" className="details">
            <h2>Party: {cleanedData.winner.party} </h2>
            <h3>Winner: {cleanedData.winner.presidentialCandidate} & {cleanedData.winner.vicePresidentialCandidate}</h3>
          </div>
          <div id="runnerUp" className="details">
            <h2>Party: {cleanedData.runnerUp.party} </h2>
            <h3>Winner: {cleanedData.runnerUp.presidentialCandidate} & {cleanedData.winner.vicePresidentialCandidate}</h3>
          </div>
          <div id="losers" className="details">
            <h3>Others:</h3>
            {
              cleanedData.losers.map((row) => {
                return <p>{row.presidentialCandidate} -- Popular Vote Percentage: {row.popularVotePercentage}</p>
              })
            }
          </div>
        </div>
      );
    } else {
      return <div id="modal"></div>
    }
  }
  cleanData(dataArray) {
    // Create a new object that has winner details, runner up details, and combined loser details.
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
