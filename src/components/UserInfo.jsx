import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class UserInfo extends Component {
  
  constructor(props) {
   super(props);
   this.state = {
     userInfo: null
   }
  }
  
  componentDidMount() {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => { 
      console.log(user);
      console.log(user.username);
      console.log(user.signInUserSession);
      console.log(user.signInUserSession.idToken);
      // this.setState({userInfo: user});
    })
    .catch(err => console.log(err));
  }
  
  render() {
    return(
      <div>{this.state.userInfo}</div>
      );
  }
}

export default UserInfo;