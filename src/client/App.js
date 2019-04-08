{/*
  Functionality of App.js :
  Main Page (Top page that is full of static
  Components, Drawer, Top App Bar and Router)
  These components will stay on every page, with only
  <DrawerAppContent> being altered.
  - - - - -
  What is the Functionality?
  - - - - -
  Serves as the Beginning page of the application, is the
  first thing the users sees, needs to have decent nav points
  explain what the app is and catch the users attention.
  */}


// - - - React, Router and Styles  - - - - - - - - //

import React, { Component } from 'react';
import { Link, Route, Switch, HashRouter } from 'react-router-dom';
import axios from 'axios';

import './Styles/App.scss';

// - - - - -Material Imports - - - - - - - - - - - - - //

import Button from '@material/react-button';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader } from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import { Headline3 } from '@material/react-typography';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';

// - - - - - - Components - - - - - - - - - - - - - - //

import Authentication from './Registration/Authentication';
import Login from './Registration/Login';
import Register from './Registration/Register';

import Home from './Components/Home';
import AreaList from './Components/One-Many/AreaList';
import PropertyList from './Components/One-Many/PropertyList';

import CreateComment from './Components/CRUD/CreateComment';
import EditComment from './Components/CRUD/EditComment';
import CommentList from './Components/CRUD/CommentList';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      open: true
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login() {
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <HashRouter>
        <div className="drawer-container">

          <Drawer
            className="drawer"
            dismissible
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
          >

            <DrawerContent>
              <DrawerHeader>
                <Link className="link" to="/">
                  <ListItemGraphic className="logo" link="/" graphic={<MaterialIcon icon="home" />} />
                </Link>
              </DrawerHeader>

              {/* - - - - - - - - - - */}
              <List className="NavList">
                <ListItem>
                  <Link className="link" to="/">
                    <ListItemText className="NavText" primaryText="Home" />
                  </Link>
                </ListItem>

                {/* * * * */}

                <ListItem>
                  <Link className="link" to="/areas">
                    <ListItemText className="NavText" primaryText="Areas" />
                  </Link>
                </ListItem>

                {!this.state.loggedIn && <ListItem>
                  <Link className="link" to="/register">
                    <ListItemText className="NavText" primaryText="Register" />
                  </Link>
                </ListItem>}

                {/* * * * */}

                {!this.state.loggedIn && <ListItem>
                  <Link className="link" to="/login">
                    <ListItemText className="NavText" primaryText="Login" />
                  </Link>
                </ListItem>}

                {/* * * * */}

                {this.state.loggedIn && <ListItem>
                  <Link className="link" to="/logout">
                    <ListItemText className="NavText" primaryText="Logout" />
                  </Link>
                </ListItem>}
              </List>
            </DrawerContent>
          </Drawer>

          <DrawerAppContent className="drawer-app-content">
            <TopAppBar
              className="TopAppBar"
              navigationIcon={(
                <MaterialIcon
                  className="menuicon"
                  icon="menu"
                  onClick={() => this.setState({ open: !this.state.open })}
                />
              )}
            />

            <TopAppBarFixedAdjust>


              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
              <Route path="/logout" render={this.logout}/>
              <Route exact path="/areas" component={Authentication(AreaList)}/>
              <Route path="/areas/:name/properties/:id" component={Authentication(PropertyList)}/>
              <Route path="/properties/:id/comments" component ={Authentication(CommentList)} />
              <Route path="/edit-comment/:id" component={Authentication(EditComment)}/>
              <Route path="/create-comment/:id" component={Authentication(CreateComment)}/>
            </TopAppBarFixedAdjust>
          </DrawerAppContent>
        </div>
      </HashRouter>
    );
  }
}
