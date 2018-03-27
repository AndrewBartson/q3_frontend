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