import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Badge from 'material-ui/Badge';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ErrorPage from '../Components/ErrorPage';
import '../CSS/Admin.css';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class Admin extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    serverLink: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.newOrgs = this.props.response.orgs
    this.componentDidCatchtags = this.props.response.tags
    this.myToken = this.props.response.myToken
    this.state = {
      selectedOrgId: false,
      canClick: true,
      status: 0,
      deleteIsClicked: false,
      value: 'a',
      newOrgs: {},
      orgs: {},
      newTags: {},
      open: false,
    };
  }

  componentWillMount() {
    console.log(this.props.orgs)
    this.setState({
      orgs: this.props.orgs,
      newOrgs: this.props.response.orgs,
      newTags: this.props.response.tags
    })
  }

  handleChange = (value) => {
    this.setState({
      value: value,
      open: false
    });
  };

  handleClick = () => {
    alert("to show more info please go to the orgs main page");
  }

  handleRequestDelete = (key) => {
    console.log(key)

    this.setState({
      open: true,
      selectedOrgId: key
    });
  }

  handleDeletOrg = (event) => {
    this.sendRequest('delete', 'remove')
  }

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  sendRequest = (method, path) => {
    this.setState(Object.assign({}, this.state, { canClick: false }));
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${this.props.serverLink}${path}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${this.myToken}`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("deleted")
        }
        this.setState(Object.assign({}, this.state, {
          status: xhr.status,
        }));
      }
    };
    xhr.send(JSON.stringify({ orgId: this.state.selectedOrgId }));
  }

  renderOrgs = (orgs) => {
    return (
      <div className="orgContainer">
        {Object.keys(orgs).map(org => {
          return (
              <Chip
              key={org}
                onRequestDelete={this.handleRequestDelete}
                onClick={this.handleClick}
                style={styles.chip}
                className="orgChip"
              >
                <Avatar src={orgs[org]["logo"]} />
                {orgs[org]["name"]}
              </Chip>
          );
        }
        )
        }
      </div>
    );
  }

  render() {
    let { newOrgs, orgs } = this.state
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDeletOrg}
      />,
    ];

    if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
      return <ErrorPage status={this.state.status} />;
    } else return (
      <div className="adminPage">
        <SwipeableViews
          className="tabsContainer"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Active Organizations" value="a">
              <div>
                <h2 style={styles.headline}>Active Organizations:</h2>
                {this.renderOrgs(orgs)}
              </div>
            </Tab>
            <Tab label="Requests" value="b" icon={<Badge
              className="badge"
              badgeContent={Object.keys(newOrgs).length}
              secondary={true}
              badgeStyle={{ top: 1, right: 1 }}
            >
            </Badge>}>
              {this.renderOrgs(newOrgs)}
            </Tab>

          </Tabs>
        </SwipeableViews>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this organization ?
        </Dialog>
      </div>
    );
  }
}

export default Admin;