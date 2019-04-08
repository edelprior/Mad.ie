{/*
  Functionality of EditComment.js :

  - Interacts with the Database for the Update function of CRUD
  - Uses Axios to get Comments and place in state
  - State object matches that of the object in MongoDB
  */}


// - - - - - React & Axios  & Styles - - - - - //

import React, { Component } from 'react';
import axios from 'axios';
// import '../Styles/App.scss';

// - - - - - Material Imports - - - - - - - - //

import TextField, { Input } from '@material/react-text-field';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Button from '@material/react-button';
import Avatar from 'react-avatar';

// Stand alone Component (No imports needed)
// - - - - - - - - - - - - - - - - - - - - - //

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email : '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // - - - - - - - - - - - - - - - - - - - - - //
  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  // - - - - - - - - - - - - - - - - - - - - - //

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error registering in please try again');
      });
  }

  // - - - - - - - - - - - - - - - - - - - - - //
  render() {
    return (
      <Grid className = "RegisterForm">
        <Row>
          <Cell columns = {12}>
            <Avatar
              className = "RegisterAvatar"
              round = {true}
              color={Avatar.getRandomColor('sitebase', ['red', 'black', 'black'])}
              name="Register" />

            <form  onSubmit={this.onSubmit}>
              <TextField className = "RegisterEmail" outlined>
                <Input
                  type="name"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required />
              </TextField>

              <TextField className = "RegisterEmail" outlined>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required />
              </TextField>
            </form>
          </Cell>
        </Row>

        <Row>
          <Cell columns= {12}>
            <form onSubmit = {this.onSubmit}>
              <TextField className = "RegisterPassword" outlined>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required />
              </TextField>
            </form>
          </Cell>
        </Row>

        <Row>
          <Cell columns = {12}>
            <form onSubmit = {this.onSubmit}>
              <Button
                className = "RegisterButton"
                raised
                type="submit"
                value="Submit">
                Register
              </Button>
            </form>
          </Cell>
        </Row>
      </Grid>
    );
  }
}
