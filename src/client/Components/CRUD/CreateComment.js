{/*
  Functionality of CreateComment.js :

  - The Create Function of the CRUD
  - Holds a router that renders the '/' of the server, the commentList
  - Has the routes that will be accessed in the other components for CRUD
  */}


// - - - - - React & Axios & Link & Styles - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../../Styles/App.scss';

// - - - - - Material Imports - - - - - - - - - - //

import { Cell, Grid, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';

// - - - - - - - - - - - - - - - - - - - - - //

export default class CreateComment extends Component {
  constructor(props) {
    super(props);
    // store form fields in state
    this.state = {comment: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // send a POST request to the server
    // the request includes the state, which is the info. for the new Comment to be created
    axios.post(`/api/comments/${this.props.match.params.id}`, this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid>
        <form onSubmit={this.handleSubmit} className ="Form">
          <TextField textarea  className ="Form" label = 'Write your comment here'>
            <Input type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}/>
          </TextField>
          <br/>
          <Button type="submit" value="Submit">Upload Comment</Button>
        </form>
      </Grid>
    );
  }
}
