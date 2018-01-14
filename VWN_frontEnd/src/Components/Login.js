import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Admin from '../Components/Admin';
import ErrorPage from '../Components/ErrorPage';
import Loading from '../Components/Loading';
import AppHeader from '../Components/AppHeader';
import { reactLocalStorage } from 'reactjs-localstorage';
class Login extends Component {
  constructor(props) {
    super(props);
    this.serverLink = 'http://localhost:8080/'
    this.state = {
      username: '',
      password: '',
      status: 0,
      response: {}
    }
  }

  componentWillMount() {
    let localStatus = reactLocalStorage.getObject('status')
    let localResponse = reactLocalStorage.getObject('response')
    this.setState({
      response: localResponse,
    })
    if (localStatus === 200) {
      this.setState({
        status: localStatus
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(Object.assign({}, this.state, { status: 1 }));
    const xhr = new XMLHttpRequest();
    xhr.open('Post', `${this.serverLink}login`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.response)
          this.setState({ response: JSON.parse(xhr.response), loggedIN: true })
          reactLocalStorage.setObject('response', response)
          reactLocalStorage.setObject('status', xhr.status)
          reactLocalStorage.setObject('username', this.state.username)
          reactLocalStorage.setObject('password', this.state.password)
        }
        this.setState(Object.assign({}, this.state, { status: xhr.status }));
      }
    };
    xhr.send(JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      status: xhr.status
    }));
  }

  render() {
    const style1 = {
      marginLeft: '30vw',
      background: '',
    };
    const style2 = {
      marginLeft: '30vw',
      background: '',
    };
    const style3 = {
      marginLeft: '38vw',
    };

    if (this.state.response) {
      if (this.state.status === 0) {
        return (
          <MuiThemeProvider>
            <TextField
              style={style1}
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              style={style2}
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" backgroundColor='#e9e8e3' primary={false} style={style3} onClick={(event) => this.handleSubmit(event)} />
          </MuiThemeProvider>
        );
      } else if (this.state.status === 1) {
        return (<Loading />);
      }
      if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
        return <ErrorPage status={this.state.status} />;
      } else if (this.state.status === 200) {
        return (
          <Admin orgs={this.props.orgs} response={this.state.response} serverLink={this.serverLink} />
        )
      }
    }
  }
}
export default Login;