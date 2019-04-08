{/*
  Home.js = A universal page (without authentication)
  */}


// - - - React, Link and Styles  - - - - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/App.scss';

// - - - - -Material Imports - - - - - - - - - - - - - //

import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline5 } from '@material/react-typography';
import Card, { CardPrimaryContent, CardMedia } from '@material/react-card';
import Button from '@material/react-button';

// - - - - - - - - - - - - - - - - - - - - //

export default class Home extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Cell columns  = {12}>
            <Headline5>Explore Properties for Sale All Across Ireland</Headline5>
          </Cell>
        </Row>

        <Row>
          <Cell columns = {6}>
            <Card outlined className = "areaCard">
              <CardPrimaryContent>
                <CardMedia square imageUrl= "https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=53.34411&lon=-6.26737&width=550&height=382&format=png&version=latest&layer=background&debug_pattern="/>
              </CardPrimaryContent>
            </Card>
          </Cell>

          <Cell columns = {6}>
            <Card outlined className = "areaCard">
              <CardPrimaryContent>
                <CardMedia square imageUrl= "https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=51.89787&lon=-8.47109&width=550&height=382&format=png&version=latest&layer=background&debug_pattern=."/>
              </CardPrimaryContent>
            </Card>
          </Cell>
        </Row>

        <br/>

        <Row>
          <Cell columns = {6}>
            <Card outlined className = "areaCard">
              <CardPrimaryContent>
                <CardMedia square imageUrl= "https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=52.66386&lon=-8.62677&width=550&height=382&format=png&version=latest&layer=background&debug_pattern="/>
              </CardPrimaryContent>
            </Card>
          </Cell>

          <Cell columns = {6}>
            <Card outlined className = "areaCard">
              <CardPrimaryContent>
                <CardMedia square imageUrl= "https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=53.27396&lon=-9.05124&width=550&height=382&format=png&version=latest&layer=background&debug_pattern=.*"/>
              </CardPrimaryContent>
            </Card>
          </Cell>
        </Row>
      </Grid>

    );
  }
}
