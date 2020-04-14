import React from 'react';

class NewGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: '',
      gameSizeSelection: 'medium'
    }
  }
  
  submitForm(){
    this.props.createNewGame(this.state);
    this.setState({titleInput: ''});
  }
  
  render() {
    return(
      <div className="NewGameForm">
        <fieldset>
          <legend>New Game</legend>
          <label for="title">Title:</label>
            <input 
              type="text" 
              name="title" 
              id="title"
              onChange={(e) => this.setState({titleInput: e.val()})}
              value={this.state.titleInput}
            />
          <label for="gameSize">Game Size:</label>
          <select id="gameSize" name="gameSize">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </fieldset>
        <button onClick={this.submitForm}>Create</button>
      </div>
      );
  }
}

export default NewGameForm;