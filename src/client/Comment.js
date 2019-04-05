{/*
  Functionality of Comment.js :

  - Represents a single 'Comment' and its props
  - Holds a router that renders the edit Comment through the <Link>
  - Delete function accessed through props via the parent component
  - Has Avatar CSS styles from material - ui
  */}


import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


// - - - - - Material Imports - - - - - - - - - - //

import { Cell, Grid, Row } from '@material/react-layout-grid';
import TextField, { HelperText, Input } from '@material/react-text-field';
import List, { ListItem } from '@material/react-list';
import { Headline5, Body1 } from '@material/react-typography';
import Button from '@material/react-button';
import Avatar from '@material-ui/core/Avatar';
import MaterialIcon from '@material/react-material-icon';

// (No imported Components as it is a standalone for export)
// - - - - - - - - - - - - - - - - - - - - - //

class Comment extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <Grid>
        <Row>
          <Cell columns = {12}>

            {/* - - - - - - - - - - - - -*/}
            <List>
              <ListItem>
                <Body1>   {this.props.comment} </Body1>
                <Button className = "pricetag"> €{this.props.price}</Button>

              </ListItem>
            </List>
            {/* - - - - - - - - - - - - -*/}
          </Cell>

          {/* - - - - - - - - - - - - -*/}

          <Button type="button"
            onClick={() => {this.props.handleDelete(this.props.id);}}>
            Delete
          </Button>

          {/* - - - - - - - - - - - - -*/}

          <Link to={`/edit-comment/${this.props.id}`}>
            <Button type="button">
             Edit
            </Button>
          </Link>

          {/* - - - - - - - - - - - - -*/}
        </Row>
      </Grid>
    );
  }
}

export default Comment;
