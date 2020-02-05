import React, { Component } from "react";

import request from "superagent";

import { NewBeachbreakForm } from "./components/NewBeachbreakForm";
import { Beachbreak } from "./models/beachbreak";
import { BeachbreakList } from "./components/BeachbreakList";
import { Map } from "./components/Map";

import { baseUrl, locationIqUrl } from "./constants";
import "./App.css";

interface State {
  newBeachbreak: Beachbreak;
  beachbreaks: Beachbreak[];
  latitude: string;
  longitude: string;
  searchBeachInput: string;
}


class App extends Component<{}, State> {
  state = {
    newBeachbreak: {
      // id: 1,
      name: "",
      latitude: "",
      longitude: ""
    },
    beachbreaks: [],
    latitude: "",
    longitude: "",
    searchBeachInput: ""
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
    // if (process.env.NODE_ENV === "development") {
    //   this.setState({ beachbreaks: this.mockData })
    //   // request
    //   // .get(baseDevUrl)
    //   // .then(res => this.setState({ beachbreaks: res.body }))
    //   // .catch(e => console.warn(e))
    // } else 
    // {
    this.getAllBeaches();
    // }
  }

  getAllBeaches = () => {
    request
    .get(baseUrl)
    .then(res => this.setState({ beachbreaks: res.body }))
    .catch(e => console.warn(e))
  }

  private addBeachbreak = (event: React.FormEvent<HTMLFormElement>) => {
    const index = this.state.beachbreaks.length - 1;
    const bla: any = this.state.beachbreaks[index];
    console.log(index)
    const input = "Peniche"
    event.preventDefault();

    request
      .get(`${locationIqUrl}key=9a3ffea2532108&q=${this.state.searchBeachInput}&format=json`)
      .accept("application/json")
      .then(res => {
        const [firstHit] = res.body;

        this.setState({
          newBeachbreak: {
            id: bla.id + 1,
            name: firstHit.display_name.split(",")[0],
            latitude: firstHit.lat,
            longitude: firstHit.lon
          }
        })
        console.log(firstHit)
        request
          .post(baseUrl)
          .send(this.state.newBeachbreak)
          .then(() => {
            this.getAllBeaches();
          })
          // .then(() => 
          //   this.setState(previousState => ({
          //   newBeachbreak: {
          //     id: bla.id + 1,
          //     name: "",
          //     latitude: "",
          //     longitude: ""
          //   },
          //   // beachbreaks: [...previousState.beachbreaks, previousState.newBeachbreak]
          // })))
          .catch(e => console.warn(e));
      })
      .catch(e => console.warn(e))

    // request
    //   .post(baseUrl)
    //   .send(this.state.newBeachbreak)
    //   .then(() => this.setState(previousState => ({
    //     newBeachbreak: {
    //       id: bla.id + 1,
    //       name: "",
    //       latitude: "",
    //       longitude: ""
    //     },
    //     beachbreaks: [...previousState.beachbreaks, previousState.newBeachbreak]
    //   })))
    //   .catch(e => console.warn(e));
  };

  private handleBeachbreakChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    this.setState({
      searchBeachInput: event.target.value
    })
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

  render() {
    const { newBeachbreak, beachbreaks } = this.state;

    return (

      <div className="App">
        <h2 className="title">Surf forecast</h2>

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
