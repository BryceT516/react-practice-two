import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    text: ''
  };

  componentWillMount () {
    document.addEventListener('keydown', this.handleHitEnter, true)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleHitEnter, true)
  }
  
  handleHitEnter(e) {
    const ENTER_KEY_CODE = 13
    if (e.target.name === 'message-input' &&
       (e.key === 'Enter' || e.keyCode === ENTER_KEY_CODE)) {
        e.stopPropagation()
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let content = {text: this.state.text, conversation_id: this.props.conversation_id};
    
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(content)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            id="message-input"
            name="message-input"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;