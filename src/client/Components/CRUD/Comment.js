{/*
  Functionality of Comment.js :

  - Represents a single 'Comment' and its props
  - Holds a router that renders the edit Comment through the <Link>
  - Delete function accessed through props via the parent component
  - Has Avatar CSS styles from material - ui
  */}

// - - - - - React & Styles & Router - - - - - - //

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../Styles/App.scss';

// - - - - - Material Imports - - - - - - - - - - //

import { Cell, Grid, Row } from '@material/react-layout-grid';
import List, { ListItem } from '@material/react-list';
import { Body1 } from '@material/react-typography';
import Button from '@material/react-button';

// (No imported Components as it is a standalone for export)
// - - - - - - - - - - - - - - - - - - - - - //

export default class Comment extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Cell columns = {12}>
            <List>
              <ListItem>
                <Body1> {this.props.comment} </Body1>
                  <Button className = "pricetag"> €{this.props.price}</Button>
              </ListItem>
            </List>
          </Cell>
          <Button type = "button"
            onClick={() =>
            {this.props.handleDelete(this.props.id);
            }}>
            Delete
          </Button>
          <Link to={`/edit-comment/${this.props.id}`}>
            <Button type="button">
             Edit
            </Button>
          </Link>
        </Row>
      </Grid>
    );
  }
}
