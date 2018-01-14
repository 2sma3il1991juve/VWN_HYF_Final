import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Route from 'react-router-dom/Route';
import '../CSS/LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }


  componentWillMount() {
    this.setState({
      data: this.props.data
    });
  }

  render() {
    const style = {
      margin: 20,
      textAlign: 'center',
      backgroundColor: '#e9e8e3',
    };
    const { data } = this.state
    return (
      <div className='LandingPageContainer'>
        <Route className='route' exact path='/' component={(props) => {
          return (
            <div className="orgContainer">
              {Object.keys(data).map((org) => {
                return (
                  <div key={org} className="org orgItem">

                        <img src={data[org]['logo']} alt="logo" />
                        <div className="itemOverlay"></div>
                        <div className="captionContainer">
                          <h3>{data[org]['name']}</h3>

                        </div>
                  </div>
                )
              }
              )
              }

            </div>
          );
        }} />
      </div >
    );
  }
}
export default LandingPage;