import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Area from './Area';
import axios from 'axios';
import './App.scss';
import {Cell, Grid, Row} from '@material/react-layout-grid';

class AreaList extends Component {
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

    const areaList = this.state.areas.map(u => (
      <Area
        key={u._id}
        id={u._id}
        name={u.name}
        image = {u.image}
      />
    ));

    return (
      <div>
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
      </div>
    );
  }
}

export default AreaList;
