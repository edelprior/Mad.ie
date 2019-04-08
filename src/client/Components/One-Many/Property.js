{/*
  TODO




  */}


// - - - React, Link, Styles   - - - - - - - - //
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../Styles/App.scss';

// - - - - -Material Imports - - - - - - - - - - - - - //

import { Headline4, Body1 ,Headline6, Overline} from '@material/react-typography';
import Card, { CardPrimaryContent, CardMedia, CardActions } from '@material/react-card';
import { Cell } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';

// - - - - - - - - - - - - - - - - - - - - //

export default class Property extends Component {

  render() {
    return (
      <Cell columns = {6}>
        <Link to={`/properties/${this.props.id}/comments`}>

          <Card className = "PropCard" outlined>

            <CardPrimaryContent>
              <Headline4>{this.props.name}</Headline4>
              <CardMedia square imageUrl={this.props.image} />
            </CardPrimaryContent>

            <Body1> {this.props.description} </Body1>

            <CardActions>
              <MaterialIcon className = "propIcons" icon="pool" />
              <Overline> {this.props.bath}  </Overline>
            </CardActions>

            <CardActions>
              <MaterialIcon className = "propIcons" icon="hotel" />
              <Overline> {this.props.size} </Overline>
            </CardActions>
            <Headline6 className = "pricetag"> €{this.props.price}</Headline6>
          </Card>
        </Link>
      </Cell>
    );
  };
}
