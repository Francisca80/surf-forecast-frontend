import React, { Component } from "react";

import request from "superagent";

import { NewBeachbreakForm } from "./components/NewBeachbreakForm";
import { Beachbreak } from "./models/beachbreak";
import { BeachbreakList } from "./components/BeachbreakList";
import { Map } from "./components/Map";
import { baseUrl } from "./constants";
import "./App.css";
import Appbar from './components/Appbar';

interface State {
  newBeachbreak: Beachbreak;
  beachbreaks: Beachbreak[];
}

class App extends Component<{}, State> {
  state = {
    newBeachbreak: {
      id: 1,
      name: "",
      location: ""
    },
    beachbreaks: []
  };

  componentDidMount() {
    request
      .get(baseUrl)
      .then(res => this.setState({ beachbreaks: res.body }))
      .catch(e => console.warn(e))
  }

  render() {
    const { newBeachbreak, beachbreaks } = this.state;

    return (
      <div className="App">
        <Appbar />
        <h2>Beachbreak List</h2>
        <NewBeachbreakForm
          beachbreak={newBeachbreak}
          onAdd={this.addBeachbreak}
          onChange={this.handleBeachbreakChange}
        />
        {beachbreaks && <BeachbreakList
          beachbreaks={beachbreaks}
          onDelete={this.deleteBeachbreak}
        />}

        <Map />
      </div>
    );
  }

  private addBeachbreak = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    request
      .post(baseUrl)
      .send(this.state.newBeachbreak)
      .then(() => this.setState(previousState => ({
        newBeachbreak: {
          id: previousState.newBeachbreak.id + 1,
          name: ""
        },
        beachbreaks: [...previousState.beachbreaks, previousState.newBeachbreak]
      })))
      .catch(e => console.warn(e));
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
    request
      .delete(`${baseUrl}/${beachbreakToDelete.id}`)
      .then(() => this.setState(previousState => ({
        beachbreaks: [
          ...previousState.beachbreaks.filter(
            beachbreak => beachbreak.id !== beachbreakToDelete.id
          )
        ]
      })))
      .catch(e => console.warn(e))
  };
}

export default App;
