import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500 } from 'material-ui/styles/colors';
import Orgs from './Components/Orgs';
import AppHeader from './Components/AppHeader';
import FiltersSidBar from './Components/FiltersSidBar';
import LandingPage from './Components/LandingPage';
import Add from './Components/Add';
import Login from './Components/Login';
import Observable from './Observable';
import Loading from './Components/Loading';
import MenuButtons from './Components/MenuButtons';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import './CSS/App.css';
import './CSS/Login.css';
import './CSS/FiltersSidBar.css'
import './CSS/Orgs.css'
class App extends Component {

  constructor() {
    super();
    this.serverLink = 'http://localhost:8080/'
    this.state = {
      Data: {},
      status: 0
    }
  }

  componentDidMount() {
    Observable.newStatefullObservable("Observable");
    const xhr = new XMLHttpRequest();
    xhr.open('Get', `${this.serverLink}search`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({
            Data: JSON.parse(xhr.response),
          });
        }
        this.setState({
          status: xhr.status
        });
      }
    }
    xhr.send();
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        textColor: '#222222',
      },
      appBar: {
        top: 0
      }
    });

    const { tags, orgs } = this.state.Data
    if (this.state.status === 200) {
      return (
        <MuiThemeProvider muiTheme={muiTheme} className="main-wrapper">
          <Router>
            <div>
              <Route exact path="/" component={() => {
                return (
                  <div>
                    <AppHeader route='/' />
                    <div className="app-container">
                        <LandingPage data={orgs} />
                      </div>
                  </div>
                );
              }} />
              <Route exact path="/login" component={() => {
                return (
                  <div>
                    <AppHeader route='/login' />
                    <div className="app-container">
                        <Login orgs={orgs} />
                      </div>
                  </div>
                );
              }} />
              <Route exact path="/add" component={() => {
                return (
                  <div>
                    <AppHeader route='/add' />
                    <div className="app-container">         
                        <Add tags={tags} />
                    </div>
                  </div>
                );
              }} />
              <Route exact path='/organizations' component={() => {
                return (
                  <div>
                    <AppHeader route='/organizations' />
                    <div className="app-container">
                      <div class="OrgsContainer">
                        <Orgs orgs={orgs} />
                      </div>
                      <div class="FiltersSidBarContainer">
                        <FiltersSidBar tags={tags} />
                      </div>
                    </div>
                  </div>
                );
              }} />
            </div>
          </Router>
        </MuiThemeProvider>
      );
    }
    else { return (<div><Loading /></div>) }
  }
}

export default App;