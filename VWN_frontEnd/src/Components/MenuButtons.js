import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';
import '../CSS/AppHeader.css';

class MenuButtons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style1 = {
      position: 'fixed',
      right: 0,
      width: '10vw',
      background: '#e9e8e3',
      labelStyle: {
        fontSize: '0.7em',
        color: '#ed2f25'
      }
    }
    const style2 = {
      position: 'fixed',
      right: '10vw',
      width: '10vw',
      background: '#e9e8e3',
      labelStyle: {
        fontSize: '1em'
      }
    }
    const style3 = {
      position: 'fixed',
      right: '20vw',
      width: '10vw',
      background: '#e9e8e3',
      labelStyle: {
        fontSize: '1em'
      }
    }
    const route = this.props.route
    console.log(this.props.route)
    return (
      <div >
        <Route className="route" exact path={route} component={(props) => {
          if (route === '/') {
            return (
              <div >
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style1} label="Organizations" labelStyle={style1.labelStyle} onClick={() => props.history.push('/organizations')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style2} label="Add ORG" labelStyle={style1.labelStyle} onClick={() => props.history.push('/add')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style3} label="Login" labelStyle={style1.labelStyle}onClick={() => props.history.push('/login')} />
              </div>
            );
          } else if (route === '/login') {
            return (
              <div>
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style1} label="Organizations" labelStyle={style1.labelStyle} onClick={() => props.history.push('/organizations')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style2} label="Add ORG" labelStyle={style1.labelStyle} onClick={() => props.history.push('/add')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style3} label="Home" labelStyle={style1.labelStyle} onClick={() => props.history.push('/')} />
              </div>
            );
          } else if (route === '/add') {
            return (
              <div >
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style1} label="Login" labelStyle={style1.labelStyle} onClick={() => props.history.push('/login')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style2} label="Organizations" labelStyle={style1.labelStyle} onClick={() => props.history.push('/organizations')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style3} label="Home" labelStyle={style1.labelStyle} onClick={() => props.history.push('/')} />
              </div>
            );
          } else if (route === '/organizations') {
            return (
              <div>
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style1} label="Login" labelStyle={style1.labelStyle} onClick={() => props.history.push('/login')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style2} label="Add ORG" labelStyle={style1.labelStyle} onClick={() => props.history.push('/add')} />
                <RaisedButton backgroundColor='#e9e8e3' primary={false} style={style3} label="Home" labelStyle={style1.labelStyle} onClick={() => props.history.push('/')} />
              </div>
            );
          }

        }} />
      </div >
    );
  }
}
export default MenuButtons;