{/*
  Functionality of Start.js :
  - Introduces the application, is the first page the user sees
  - Holds a router that renders the '/' of the server, the commentList
  - Has the routes that will be accessed in the other components for CRUD
  */}


// - - -React, Router and Styles  - - - - - - - - //

import React, { Component } from 'react';
import axios from 'axios';
import { Link, HashRouter, Route } from 'react-router-dom';
import './App.scss';

// - - - - - Material Imports - - - - - - - - - - //
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline2, Headline4,Headline5, Body1} from '@material/react-typography';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';


// - - - - - - - - - - - - - - - - - - - - - //
export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    };
  }

  componentDidMount() {
    axios.get('/api/secret')
      .then(response => this.setState({message: response.data}));
  }

  render() {

    return (
      <div>
        <h2> {this.state.message} </h2>
        <h1> start </h1>
      </div>
    );
  }
}
