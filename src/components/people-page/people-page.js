import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';

import './people-page.css';
import SwapiService from "../../services/swapi-service";




export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3
  };



  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
        <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}>

          {(i) => (
              `${i.name} (${i.birthYear})`
           )}  
        </ItemList>       
    );

    const personDetails = (
        <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <ErrorBoundry> 
         <Row left={itemList} right={personDetails} />
      </ErrorBoundry> 
    );
  }
}