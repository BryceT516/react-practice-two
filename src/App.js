import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';

import GamesList from './components/GamesList';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_q9IkW7VmH',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '6qoqfmp5jnlsevn17r4e1ha6ao',
    }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: null
    }
    
  }
  
  componentDidMount() {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => { 
      this.setState({jwtToken: user.signInUserSession.idToken.jwtToken});
    })
    .catch(err => console.log(err));
  }
  
  render () {
    return (
      <div className="App">
        <GamesList />
      </div>
    );
  }
}

export default withAuthenticator(App);
