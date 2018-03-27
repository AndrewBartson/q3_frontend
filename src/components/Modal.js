

// ---------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = { modalProps: this.props.modalProps };
  }

  render() {
    console.log("CURRENT STATE OF MODAL: ")
    console.log(this.props.modalProps);
    return (
      <div id="modal">
        <p>Title: {this.props.modalProps.title}</p>
      </div>
    );
  }
}
//----------------------------------------------------------------------------
//
// `<div class="hoverinfo"><strong>
//   ${geography.properties.name},
//   ${data.electoral_votes} electoral votes,
//   ${data.margin} Margin of Victory
// </strong></div>`;

//
// `<div class="hoverinfo"><strong>
//   ${geography.properties.name}</strong></div>`;
//



//
// responsive: false,
//       done: function(datamap) {
//         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
//           setModalProps({state: true,
//                          title: geography.properties.name,
//                          data: []});
//         });
//       }
//
//
//
//
//
//   //REDUCER
//   export default function modalProps(state = {}, action) {
//   return state;
// }
//
//
// let modalProps = this.props.modalProps;
// let setModalProps = this.props.setModalProps;
//
//   //APP.JSX
//   <Modal modalProps={this.state.modalProps}/>
//
//   <DataMap
//             regionData={this.props.regionData}
//             modalProps={this.state.modalProps}
//             setModalProps={(newModalProps) => this.setModalProps(newModalProps)}
//           />
//
//
//   App.propTypes = {
//   regionData: PropTypes.array.isRequired,
//   modalProps: PropTypes.object.isRequired,
//   emptyRegions: PropTypes.array.isRequired,
//   sortState: PropTypes.object.isRequired
// };
