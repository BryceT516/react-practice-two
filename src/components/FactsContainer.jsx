import React, { Component } from 'react'
import axios from 'axios';
import Fact from './Fact'

class FactsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentToken: null,
      facts: []
    }
  }

  componentDidMount() {
    
  }
  
  componentDidUpdate() {
    if (this.props.idToken !== this.state.currentToken) {
      this.setState({currentToken: this.props.idToken});
      this.getFacts();
    }
  }
  
  getFacts() {
    if (this.props.idToken) {
      let config = {
        headers: { 'Authorization': `Bearer ${this.props.idToken}` }
      };

      let url = 'http://localhost:3000/v1/facts';
      
      axios.get(url, config)
        .then(response => {
          this.setState({
            facts: response.data
          })
        })
        .catch(error => console.log(error))
    }
  }

  render () {
    return (
      <div>
        <h1>Facts...</h1>
        {this.state.facts.map((fact, index) => (
          <Fact key={index} fact={fact} />
        ))}
      </div>
      )
  }
}

export default FactsContainer;