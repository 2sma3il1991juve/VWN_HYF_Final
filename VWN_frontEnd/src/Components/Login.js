import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Admin from '../Components/Admin';
import ErrorPage from '../Components/ErrorPage';
import Loading from '../Components/Loading';

const style = {
  margin: 50,
};
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

  handleSubmit(event) {
    // event.preventDefault();
    this.setState(Object.assign({}, this.state, { status: 1 }));
    const xhr = new XMLHttpRequest();
    xhr.open('Post', `${this.serverLink}login`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log('readyState')
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.response))
          this.setState({ response: JSON.parse(xhr.response) })
          // console.log(this.response.myToken)
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
    if (this.state.response) {
      if (this.state.status === 0) {
        return (
          <div>
            <MuiThemeProvider>
              <div>
                <AppBar
                  title="Login"
                />
                <TextField
                  hintText="Enter your Username"
                  floatingLabelText="Username"
                  onChange={(event, newValue) => this.setState({ username: newValue })}
                />
                <br />
                <TextField
                  type="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                <br />
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)} />
              </div>
            </MuiThemeProvider>
          </div>
        );
      } else if (this.state.status === 1) {
        return (<Loading />);
      }
      if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
        return <ErrorPage status={this.state.status} />;
      } else if (this.state.status === 200) {
        return (
          <div>
            <Admin orgs={this.props.orgs} response={this.state.response} serverLink={this.serverLink} />
          </div>
        )
      }
    }
  }
}
export default Login;