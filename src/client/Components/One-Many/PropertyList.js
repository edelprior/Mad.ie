{/*
  TODO




  */}


// - - - React, Link, Styles   - - - - - - - - //
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../../Styles/App.scss';
// - - - - -Material Imports - - - - - - - - - - - - - //
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Headline5, Body1, Button} from '@material/react-typography';
// - - - - - - Components - - - - - - - - - - - - - - //

import Property from './Property';
import CommentList from '../CRUD/CommentList';
// - - - - - - - - - - - - - - - - - - - - //

export default class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = { properties: [] };
  }

  componentDidMount() {
    axios.get(`api/areas/${this.props.match.params.id}/properties`)
      .then(response => {
        this.setState({ properties: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const propertyList = this.state.properties.map(p => (
      <Property
        key={p._id}
        id={p._id}
        name={p.name}
        size={p.size}
        bath = {p.bath}
        description = {p.description}
        image = {p.image}
        price = {p.price}
      />
    ));

    return (
      <Grid>
        <Row>
          <Cell columns={1}/>
          <Cell columns = {10}>
            <Row>
              <Cell columns={12}>
                <Button>
                  All Properties in {this.props.match.params.name}
                </Button>
              </Cell>
            </Row>
            <Row> {propertyList} </Row>
          </Cell>
          <Cell columns={1}/>
        </Row>
      </Grid>

    );
  }
}
