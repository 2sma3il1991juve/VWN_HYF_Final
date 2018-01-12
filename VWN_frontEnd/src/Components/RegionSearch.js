import React, { Component } from 'react';
import Map from './Map';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Observable from '../Observable';
import '../CSS/RegionSearch.css';

export default class RegionSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRegions: {},
            open: false
        };
        this.handleRegionChange = this.handleRegionChange.bind(this);
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

    // handleOpen = () => {
    //     this.setState({ open: true });
    // };

    // handleClose = () => {
    //     this.setState({ open: false });
    // };

    render() {
        const actions = [
            <FlatButton
                className="popUpBtn"
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div className="map">
                {/* <FlatButton label="Map" onClick={this.handleOpen} />
                <div>
                    <Dialog
                        paperClassName="popUp"
                        title="Please select a region:"
                        titleClassName="dialogTitle"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    > */}
                        <Map activeRegions={this.state.activeRegions} handle={this.handleRegionChange} />
                    {/* </Dialog>
                </div> */}
            </div>
        )
    }
}