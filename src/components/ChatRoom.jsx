import React from "react";
import MessageForm from "./MessageForm.js";
import {ActionCableConsumer} from 'react-actioncable-provider';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.bottom = React.createRef();
    this.handleReceived = this.handleReceived.bind(this);
  }

  componentDidMount() {
    App.cable.subscriptions.create(
      {channel: "ChatChannel"},
      {
        received: this.handleReceived,
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    );
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  handleReceived(data) {
    this.setState({
      messages: this.state.messages.concat(data.message)
    });
  }

  render() {
    const messageList = this.state.messages.map(message => {
      return (
        <li key={message.id}>
          {message}
          <div ref={this.bottom}/>
        </li>
      );
    });
    return (
      <ActionCableConsumer channel="ChatChannel"
                           onReceived={this.handleReceived}>
        <div className="chatroom-container">
          <div>ChatRoom</div>
          <div className="message-list">{messageList}</div>
          <MessageForm/>
        </div>
      </ActionCableConsumer>
    );
  }
}

export default ChatRoom;