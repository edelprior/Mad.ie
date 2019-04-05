import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Headline4, Headline5, Body1, Body2, Button} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@material/react-card';
import MaterialIcon from '@material/react-material-icon';


class Property extends Component {

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
              <Button>
                {this.props.bath}
              </Button>
            </CardActions>
            <CardActions>
              <MaterialIcon  className = "propIcons"  icon="hotel" />
              <Button>
                {this.props.size}
              </Button>
            </CardActions>
            <Button className = "pricetag"> €{this.props.price}</Button>
          </Card>
        </Link>
      </Cell>
    );
  };

}
export default Property;
