import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";


export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};


export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) { 
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item)
         });
      });
  }

  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a person from a list</span>;
    }

    const { name } = item;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map( this.props.children, (child) => {
                return React.cloneElement( child, {item} );
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
