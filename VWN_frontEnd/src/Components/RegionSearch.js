import React, { Component } from 'react';
import Map from './Map';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Observable from '../Observable';
export default class RegionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRegions: {},
      open: false
    };
  }

  componentWillMount() {
    this.setState({
      activeRegions: Observable.getHash('r')
    });
  }

  handleRegionChange = (event) => {
    let { activeRegions } = this.state
    if (activeRegions[event.target.id]) {
      activeRegions[event.target.id] = false
    } else {
      activeRegions[event.target.id] = true
    }
    Observable.updateState("Observable", "activeRegions", activeRegions)
    Observable.setHash("r", activeRegions)
  }

  render() {
    return (
      <Map activeRegions={this.state.activeRegions} handle={this.handleRegionChange} />
    )
  }
}