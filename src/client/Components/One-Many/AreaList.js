{/*
  TODO
  */}


// - - - React, Link, Styles & Axios  - - - - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/App.scss';
import axios from 'axios';

// - - - - -Material Imports - - - - - - - - - - - - - //
import {Cell, Grid, Row} from '@material/react-layout-grid';

// - - - - - - Components - - - - - - - - - - - - - - //
import Area from './Area';

// - - - - - - - - - - - - - - - - - - - - //

export default class AreaList extends Component {
  constructor(props) {
    super(props);
    this.state = { areas: [] };
  }

  componentDidMount() {
    axios.get('api/areas')
      .then(response => {
        this.setState({ areas: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const areaList = this.state.areas.map(a => (
      <Area
        key={a._id}
        id={a._id}
        name={a.name}
        image = {a.image}
      />
    ));

    return (
        <Grid>
          <Row>
            <Cell columns={1}/>
            <Cell columns = {10}>
              <Row>
                {areaList}
              </Row>
            </Cell>
            <Cell columns={1}/>
          </Row>
        </Grid>

    );
  }
}
