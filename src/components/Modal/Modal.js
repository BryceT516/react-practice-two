import React from "react";

class Modal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div>
        {this.props.children}
        <button onClick={e => {this.props.hide(e)}}>
          Close
        </button>
      </div>
    );
  }
}

export default Modal;