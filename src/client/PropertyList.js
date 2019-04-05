import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Property from './Property';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Headline5, Body1, Body2, Button} from '@material/react-typography';
import CommentList from './CommentList';

class PropertyList extends Component {
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
    const propertyList = this.state.properties.map(u => (
      <Property
        key={u._id}
        id={u._id}
        name={u.name}
        size={u.size}
        bath = {u.bath}
        description = {u.description}
        image = {u.image}
        price = {u.price}
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
            <Row>

              {propertyList}

            </Row>
          </Cell>
          <Cell columns={1}/>
        </Row>


        <Row>
          <Cell columns={1}/>
          <Cell columns = {10}>
            <Row>
              <Cell columns={12}>
                <Headline4>
              Bids in {this.props.match.params.name}
                </Headline4>
              </Cell>

            </Row>
          </Cell>
        </Row>
      </Grid>

    );
  }
}

export default PropertyList;
