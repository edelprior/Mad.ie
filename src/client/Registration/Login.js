{/*
  TODO
  */}


// - - - React, Link and Styles  - - - - - - - - //
import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/App.scss';

// - - - - -Material Imports - - - - - - - - - - - - - //
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import Avatar from 'react-avatar';
import { Cell, Grid, Row } from '@material/react-layout-grid';

// - - - - - - - - - - - - - - - - - - - - //

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };
// - - - - - - - - - - - - - - - - - - - - //

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

// - - - - - - - - - - - - - - - - - - - - //

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/authenticate', this.state)
      .then(res => {
        if (res.status === 200) {
          // run the login function in the parent component
          this.props.handleLogin();
          // redirect to /
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  // - - - - - - - - - - - - - - - - - - - - //

  render() {
    return (
      <Grid className = "LoginForm">
        <Row>
          <Cell columns = {12}>
            <Avatar className = "LoginAvatar"
                    round = { true }
                    color = {Avatar.getRandomColor('sitebase', ['red', 'black', 'black'])}
                    name = "E" />

            <form onSubmit={this.onSubmit}>
              <TextField outlined className = "LoginEmail">
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
          <Cell columns = {12}>
            <form onSubmit = {this.onSubmit}>
              <TextField outlined className = "LoginPassword">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </TextField>
            </form>
          </Cell>
        </Row>

        <Row>
          <Cell columns = {12}>
            <form onSubmit = {this.onSubmit}>
              <Button className = "LoginButton" raised type="submit" value="Submit"> Log In </Button>
            </form>
          </Cell>
        </Row>
      </Grid>

    );
  }
}
