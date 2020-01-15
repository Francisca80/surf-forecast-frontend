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
  latitude: number;
  longitude: number;
}

class App extends Component<{}, State> {
  state = {
    newBeachbreak: {
      id: 1,
      name: "",
      latitude: 0,
      longitude: 0
    },
    beachbreaks: [],
    latitude: 0,
    longitude: 0
  };

  componentDidMount() {
    request
      .get(baseUrl)
      .then(res => this.setState({ beachbreaks: res.body }))
      .catch(e => console.warn(e))
  }



  private addBeachbreak = (event: React.FormEvent<HTMLFormElement>) => {
    const index = this.state.beachbreaks.length - 1;
    const bla: any = this.state.beachbreaks[index]
    event.preventDefault();
    request
      .post(baseUrl)
      .send(this.state.newBeachbreak)
      .then(() => this.setState(previousState => ({
        newBeachbreak: {
          id: bla.id + 1,
          name: "",
          latitude: 0,
          longitude: 0
        },
        beachbreaks: [...previousState.beachbreaks, previousState.newBeachbreak]
      })))
      .catch(e => console.warn(e));
  };

  private handleBeachbreakChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newBeachbreak: {
        ...this.state.newBeachbreak,
        name: event.target.value,
        latitude: 0,
        longitude: 0
      }
    });
  };

  private deleteBeachbreak = (beachbreakToDelete: Beachbreak) => {
    console.log(beachbreakToDelete)
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

  render() {
    const { newBeachbreak, beachbreaks, latitude, longitude } = this.state;

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
}

export default App;
