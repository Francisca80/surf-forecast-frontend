import React, { Component } from "react";

import request from "superagent";

import { NewBeachbreakForm } from "./components/NewBeachbreakForm";
import { Beachbreak } from "./models/beachbreak";
import { BeachbreakList } from "./components/BeachbreakList";
import { Map } from "./components/Map";
import { baseUrl, windyUrl } from "./constants";
import "./App.css";

interface State {
  newBeachbreak: Beachbreak;
  beachbreaks: Beachbreak[];
  latitude: string;
  longitude: string;
}


class App extends Component<{}, State> {
  state = {
    newBeachbreak: {
      id: 1,
      name: "",
      latitude: "",
      longitude: ""
    },
    beachbreaks: [],
    latitude: "",
    longitude: ""
  };

  mockData = [
    {
      id: 1,
      name: "Figueira da Foz",
      latitude: "38.916",
      longitude: "-9.908",
      waveheightvalue: 1.02,
      swellperiodvalue: 2,
      windspeedvalue: 2.6,
      winddirectionvalue: 340

    },
    {
      id: 2,
      name: "Peniche",
      latitude: "39.433",
      longitude: "-9.284",
      waveheightvalue: 1.70,
      swellperiodvalue: 6,
      windspeedvalue: 8.9,
      winddirectionvalue: 310
    },
    // {
    //   id: 3,
    //   name: "Nazare",
    //   latitude: "35.988",
    //   longitude: "4.542",
    //   waveheightvalue: 1.70,
    //   swellperiodvalue: 6,
    //   windspeedvalue: 8.9,
    //   winddirectionvalue: 310
    // }
  ]

  componentDidMount() {
    const apikKey = `${process.env.REACT_APP_WINDY_API_KEY}`;
    // this.setState({ beachbreaks: this.mockData })

    if (process.env.NODE_ENV === "development") {
      this.setState({ beachbreaks: this.mockData })
      // request
      // .get(baseDevUrl)
      // .then(res => this.setState({ beachbreaks: res.body }))
      // .catch(e => console.warn(e))
    } else {
      request
        .get(baseUrl)
        .then(res => this.setState({ beachbreaks: res.body }))
        .catch(e => console.warn(e))

    }
    // request
    //   .get(baseDevUrl)
    //   .then(res => this.setState({ beachbreaks: res.body }))
    //   .catch(e => console.warn(e))

    // request
    //   .get(`${windyUrl}/list/nearby=39.433,-9.284,10?show=webcams:location,image`)
    //   .set("x-windy-key", apikKey)
    //   .then(res => console.log(res.body.result))
    //   .catch(e => console.warn(e))

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
          latitude: "",
          longitude: ""
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
        latitude: "",
        longitude: ""
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
    const { newBeachbreak, beachbreaks } = this.state;

    return (

      <div className="App">
        <h2 className="title">Overview</h2>

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
