import React, { Component } from 'react';

import LandingContainer from '../LandingContainer';

import { Segment, Input } from 'semantic-ui-react';

import './orders.css'

class CleaningOrders extends Component {

  constructor() {
    super();
    this.state = {
      hasStatus: false,
      hasDateAndTime: true,
      data: [
        {
          name: 'Cleaning orders',
          dateTime: '12-oct-18',
        },
      ],
    };
  };

  render() {
    return (
      <div className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <h2> Cleaning Now </h2>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Segment>
        </Segment.Group>
        <LandingContainer {...this.state} />
      </div>
    );
  }
}

export default CleaningOrders;
