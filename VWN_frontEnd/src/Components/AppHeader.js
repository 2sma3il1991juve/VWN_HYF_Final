import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuButtons from '../Components/MenuButtons'
import '../CSS/AppHeader.css';

export default class AppHeader extends Component {
  render() {
    const image = "https://www.vluchtelingenwerk.nl/sites/all/themes/vwn_internet/img/logo-header-1.png";
    const style = {
      position: 'fixed',
      background: '#e9e8e3',
      height: '10vw',
      top: 0,
      width: '100%'
    }

    return (
      <div>
        <MenuButtons route={this.props.route} />
        <AppBar
          className="AppBar"
          style={style}
          iconElementLeft={<img src={image}
            alt="vwn-logo" className="VWNLogo"
          />}
        />
      </div>
    )
  }
}