import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import '../CSS/ContactInfo.css';

class ContactsInfo extends Component {

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {

    const actions = [
      <FlatButton
        className="popUpBtn"
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <FlatButton label="Contact Info" onClick={this.handleOpen} />
        <Dialog
          title="Contact info:"
          titleClassName="dialogTitle"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          paperClassName="popUp"
        >
          {Object.keys(this.props.orgContacts).map(e => {
            if (e !== 'id' && e !== 'latitude' && e !== 'longitude') {
              console.log(e.toString())
              return (<div key={e}>
                <p>
                  <span className="contactTitle">{e.toString()}: </span>
                  {e.toString() === 'web' ? <a href={this.props.orgContacts[e]}>{this.props.orgContacts[e]}</a> : <span className="contactInfo"> {this.props.orgContacts[e]}</span>}
                </p>
              </div>)
            }
            return undefined
          })
          }
        </Dialog>
      </div>
    );
  }
}

export default ContactsInfo