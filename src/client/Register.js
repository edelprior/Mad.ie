import React, { Component } from 'react';
import axios from 'axios';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
import Avatar from 'react-avatar';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import './App.scss';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password: '',
    //  secondpassword: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

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

  render() {
    return (
      <Grid className = "RegisterForm">
        <Row>
          <Cell columns = {12}>
            <Avatar className = "RegisterAvatar"
              round = {true} color={Avatar.getRandomColor('sitebase', ['red', 'black', 'black'])} name="Reddit" />
            <form  onSubmit={this.onSubmit}>
              <TextField className = "RegisterEmail" outlined>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />

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
                  required
                />
              </TextField>
            </form>
          </Cell>
        </Row>
        <Row>
          <Cell columns = {12}>
            <form onSubmit = {this.onSubmit}>
              <Button className = "RegisterButton" raised type="submit" value="Submit"> Register </Button>
            </form>

          </Cell>
        </Row>
      </Grid>
    );
  }
}
