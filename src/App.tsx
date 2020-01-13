import React, { Component } from "react";

import { NewBeachbreakForm } from "./components/NewBeachbreakForm";
import { Beachbreak } from "./models/beachbreak";
import { BeachbreakList } from "./components/BeachbreakList";
import { Map } from "./components/Map";
import "./App.css";

interface State {
  newBeachbreak: Beachbreak;
  beachbreaks: Beachbreak[];
}

class App extends Component <{}, State> {
  state = {
    newBeachbreak: {
      id: 1,
      name: ""
    },
    beachbreaks: []
  };

  render() {
    return (
      <div className="App">
        <h2>Beachbreak List</h2>
        <NewBeachbreakForm
          beachbreak={this.state.newBeachbreak}
          onAdd={this.addBeachbreak}
          onChange={this.handleBeachbreakChange}
        />
        <BeachbreakList
          beachbreaks={this.state.beachbreaks}
          onDelete={this.deleteBeachbreak}
        />
        <Map/>
      </div>
    );
  }

  private addBeachbreak = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => ({
      newBeachbreak: {
        id: previousState.newBeachbreak.id + 1,
        name: ""
      },
      beachbreaks: [...previousState.beachbreaks, previousState.newBeachbreak]
    }));
  };

  private handleBeachbreakChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newBeachbreak: {
        ...this.state.newBeachbreak,
        name: event.target.value
      }
    });
  };

  private deleteBeachbreak = (beachbreakToDelete: Beachbreak) => {
    this.setState(previousState => ({
      beachbreaks: [
        ...previousState.beachbreaks.filter(
          beachbreak => beachbreak.id !== beachbreakToDelete.id
        )
      ]
    }));  
  };
}

export default App;
