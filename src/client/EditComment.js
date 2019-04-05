{/*
  Functionality of EditComment.js :

  - Interacts with the Database for the Update function of CRUD
  - Uses Axios to get Comments and place in state
  - State object matches that of the object in MongoDB
  */}


// - - - - - React & Axios - - - - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// - - - - - Material Imports - - - - - - - - //
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {  Headline5 } from '@material/react-typography';
import TextField, { HelperText, Input } from '@material/react-text-field';
import Button from '@material/react-button';

// Stand alone Component (No imports needed)
// - - - - - - - - - - - - - - - - - - - - - //

class EditComment extends Component {
  constructor(props) {
    super(props);

    // Comment object identical to that of the MongoDB

    this.state = {_id: '', comment: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // when this Component mounts, fetch data relating to the Comment to be edited
    // the Comment's ID is passed in via the URL and accessed via props
    axios.get('/api/comments/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          comment: response.data.comment,

        });
      })
      .catch(error => {
        console.log(error);
      });
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

    // send a PUT request to the server
    // the request includes the state, which is the updated comment information
    axios.put('/api/comments', this.state)
      .then(res => this.props.history.push('/comments')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <Grid>
        <Row>
          <Cell columns = {12}>
            <Headline5> Edit a Comment </Headline5>
            {/* - - - - - - - - - - - - - - - - - */}
            <form onSubmit={this.handleSubmit}>

              <TextField textarea className = "Form" label = "What would you like to change?">
                <Input type="text"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleChange} />
              </TextField>

              {/* - - - - - - - - - - - - - - - - - */}

              <Button type="button"
                onClick={() => {this.props.handleDelete(this.props.comment);}}>
                Delete Comment
              </Button>

              <Button type="submit"
                value="Submit">
                Re - Upload Comment
              </Button>
              {/* - - - - - - - - - - - - - - - - - */}
            </form>
          </Cell>
        </Row>
      </Grid>
    );
  }
}

export default EditComment;
