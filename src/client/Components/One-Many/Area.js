{/*
  TODO
  */}


// - - - React, Link and Styles  - - - - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../Styles/App.scss';

// - - - - -Material Imports - - - - - - - - - - - - - //

import { Cell } from '@material/react-layout-grid';
import { Headline4 } from '@material/react-typography';
import Card, { CardPrimaryContent, CardMedia } from '@material/react-card';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

export default class Areas extends Component {
  render() {
    return (
      <Cell columns={6}>
        <Link to = { `/areas/${this.props.name}/properties/${this.props.id}` }>
          <Card outlined className = "areaCard">
            <CardPrimaryContent>
              <Headline4 className = "PropertyName">{this.props.name}</Headline4>
              <CardMedia square imageUrl={this.props.image} />
            </CardPrimaryContent>
          </Card>
        </Link>
      </Cell>
    );
  }
}
