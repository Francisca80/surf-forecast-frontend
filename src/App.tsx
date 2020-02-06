import React, { Component } from "react";

import request from "superagent";
import { CircularProgress } from "@material-ui/core";

import { NewBeachbreakForm } from "./components/NewBeachbreakForm";
import { Beachbreak } from "./models/beachbreak";
import { BeachbreakList } from "./components/BeachbreakList";

// import { Map } from "./components/Map";
import { baseUrl, locationIqUrl, baseDevUrl } from "./constants";
import { mockData } from "./mockData";
import "./App.css";

interface State {
  newBeachbreak: Beachbreak;
  beachbreaks: Beachbreak[];
  latitude: string;
  longitude: string;
  searchBeachInput: string;
  loading: boolean;
}

class App extends Component<{}, State> {
  state = {
    newBeachbreak: {
      name: "",
      latitude: "",
      longitude: ""
    },
    beachbreaks: [],
    latitude: "",
    longitude: "",
    searchBeachInput: "",
    loading: true
  };

  componentDidMount() {
    // this.getAllBeaches();
    this.mockTimeOut();
  }

  mockTimeOut = () => {
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ beachbreaks: mockData })
      this.setState({ loading: false })
    }, 2000)
  }

  getAllBeaches = () => {
    this.setState({
      loading: true
    })
    request
      .get(baseDevUrl)
      .then(res => this.setState({ beachbreaks: res.body }))
      .catch(e => console.warn(e))
      .finally(() => this.setState({ loading: false }))
  }

  private addBeachbreak = (event: React.FormEvent<HTMLFormElement>) => {
    this.setState({ loading: true })

    const index = this.state.beachbreaks.length - 1;
    const lastBeach: any = this.state.beachbreaks[index];

    event.preventDefault();

    request
      .get(`${locationIqUrl}key=9a3ffea2532108&q=${this.state.searchBeachInput}&format=json`)
      .accept("application/json")
      .then(res => {
        const [firstHit] = res.body;

        this.setState({
          newBeachbreak: {
            id: lastBeach.id + 1,
            name: firstHit.display_name.split(",")[0],
            latitude: firstHit.lat,
            longitude: firstHit.lon
          }
        })
        request
          .post(baseUrl)
          .send(this.state.newBeachbreak)
          .then(() => this.getAllBeaches())
          .catch(e => console.warn(e));
      })
      .catch(e => console.warn(e))
  };

  private handleBeachbreakChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    this.setState({
      searchBeachInput: event.target.value
    })

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
    const { newBeachbreak, beachbreaks, loading } = this.state;

    return (

      <div className="App">
        <h2 className="title">Surf forecast</h2>

        <NewBeachbreakForm
          beachbreak={newBeachbreak}
          onAdd={this.addBeachbreak}
          onChange={this.handleBeachbreakChange}
        />

        {<div className={!loading ? 'fade-in' : ''}>
          <BeachbreakList
            loading={loading}
            beachbreaks={beachbreaks}
            onDelete={this.deleteBeachbreak}
          />
        </div>}

        {loading && <div className="styleProgressCircle">
          <CircularProgress size={140} color="primary" />
        </div>}

        {/* <Map /> */}
      </div>
    );
  }
}

export default App;
