import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import Row from '../row';
import PersonDetails, { Record } from '../item-details/item-details';

import './app.css';
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
    image: null
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;


    const personDetails  = (
      <PersonDetails
       itemId={11}
       getData={getPerson}
       getImageUrl={getPersonImage}>
       <Record field="gender" label="Gender" />
       <Record field="eyeColor" label="eyeColor" /> 
      </PersonDetails>
    );

    const starshipDetails = (
      <PersonDetails 
       itemId={5} 
       getData={getStarship}
       getImageUrl={getStarshipImage}>
       <Record field="model" label="Model" />
       <Record field="length" label="Length" />
       <Record field="constInCrediets" label="Const" />
      </PersonDetails> 
    );

    return (
      <div className="stardb-app">
        <Header />
        { planet }


        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage />
        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}
