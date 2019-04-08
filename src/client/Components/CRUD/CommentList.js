{/*
  Functionality of CommentList.js :

  - Gets a list of comments from the DB and returns them
  - returns in a comment Component, and offers Delete and
  - Edit functions of each, including re-rendering so the
  - List gets updated with each interaction.
  */}

// - - - - - React & Axios & Link & Styles - - - - - //

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../../Styles/App.scss';

// - - - - - Material Imports - - - - - - - - //

import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import { Body1 } from '@material/react-typography';

// - - - - - Components - - - - - - - - - - //

import Comment from './Comment';
import Property from '../One-Many/Property';

// - - - - - - - - - - - - - - - - - - - - - //



export default class CommentList extends Component {
  constructor(props) {
    super(props);
    {/*  store the array that will be gotten from the DB
         in an  array in the state & updatecomments to fetch
         the data from the DB, aswell as handleDelete to give
         delete function part of the CRUD */}
    this.state = { comments: [], property: '' };

    this.updateComments = this.updateComments.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`api/properties/${this.props.match.params.id}/comments`)
      .then(response => {
        this.setState({
          comments: response.data.comments,
          property: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  updateComments() {
    // make a GET request to the server for the comment data, store it in state
    axios.get('api/comments')
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);

      });

  }

  handleDelete(commentId) {
    // make a DELETE request to the server to remove the comment with this commentId
    axios
      .delete('api/comments', {
        data: {
          id: commentId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of comments, will trigger a re-render
        this.updateComments();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.property);
    // for each comment object, produce a comment Component
    const commentList = this.state.comments.map(u => (
      <Comment
        key={u._id}
        id={u._id}
        comment={u.comment}
        price={u.price}
        handleDelete={this.handleDelete}
      />

    ));

    return (
      <div>
        <Property
          id={this.state.property._id}
          name={this.state.property.name}
          size={this.state.property.size}
          bath = {this.state.property.bath}
          description = {this.state.property.description}
          image = {this.state.property.image}
          price = {this.state.property.price}
        />
        <Link className = "BidLink"
          to = { `/create-comment/${this.props.match.params.id}` }>
          <MaterialIcon
            className = "BidLink"
            icon = "add"
            type="button" />
        </Link>
        <div className = "commentList">{commentList}</div>
      </div>
    );
  }
}
