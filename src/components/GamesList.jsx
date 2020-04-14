import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import './GamesList.css';
import Modal from './Modal/Modal';
import NewGameForm from './NewGameForm/NewGameForm';

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      activeGame: null,
      newGameShow: false
    };
  }
  
  componentDidMount = () => {
    fetch(`${API_ROOT}/games`)
    .then(res => res.json())
    .then(games => this.setState({ games }));
  };
  
  handleClick = (id) => {
    this.setState({ activeGame: id });
  };
  
  handleReceivedGame = (response) => {
    const { game } = response;
    this.setState({
      games: [...this.state.games, game]
    });
  };
  
  showNewGameForm() {
    this.setState({newGameShow: !this.state.newGameShow})
  };
  
  hideNewGameForm = e => {
    this.setState({newGameShow: false});
  };
  
  createNewGame = (formData) => {
    console.log("in createNewGame...");
    console.log(formData);
    this.hideNewGameForm();
  }
  
  render = () => {
    const games = this.state.games;
    const activeGame = this.state.activeGame;
    
    return (
      <div className="gamesList">
        <ActionCableConsumer
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
        <h2 className="GameHeading">Games</h2>
        <button id="new-game-btn" onClick={e => {this.showNewGameForm();}} className="new-game-btn">
        New Game
        </button>
        <Modal show={this.state.newGameShow} hide={this.hideNewGameForm}>
          <NewGameForm />
        </Modal>
        <ul>{mapGames(games, this.handleClick, activeGame)}</ul>
        
      </div>
    )
  }
}

export default GamesList;


const mapGames = (games, handleClick, activeGame) => {
  return games.map(game => {
    let classSettings = "GameListing";
    if(activeGame === game.id) { classSettings = classSettings + " ActiveGameListing" }
    return (
      <li key={game.id} onClick={() => handleClick(game.id)} className={classSettings}>
        {game.title}
        <div>
          Additional Game Information here.<br />
          And more...
        </div>
      </li>
    );
  });
};