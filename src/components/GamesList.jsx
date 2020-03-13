import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import './GamesList.css';

class GamesList extends React.Component {
  state = {
    games: [],
    activeGame: null
  };
  
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
  
  render = () => {
    const { games, activeGame } = this.state;
    return (
      <div className="gamesList">
        <ActionCableConsumer
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
        <h2 className="GameHeading">Games</h2>
        <button id="new-game-btn" onClick={this.showNewGameForm} className="new-game-btn">
        New Game
        </button>
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