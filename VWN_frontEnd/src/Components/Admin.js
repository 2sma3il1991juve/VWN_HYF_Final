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
import { reactLocalStorage } from 'reactjs-localstorage';
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
    this.myToken = this.props.response.myToken
    this.state = {
      selectedOrgId: '',
      selectedNewOrg: {},
      status: 0,
      value: 'a',
      newOrgs: {},
      orgs: {},
      newTags: {},
      open: false,
      open1: false,
      username: '',
      password: '',
      response: {}
    };

  }

  componentWillMount() {
    console.log(this.state.username, this.state.password)
    console.log(this.props.orgs)
    let localStatus = reactLocalStorage.getObject('status')
    let localResponse = reactLocalStorage.getObject('response')
    let username = reactLocalStorage.getObject('username')
    let password = reactLocalStorage.getObject('password')
    console.log(localResponse)
    this.setState({
      orgs: this.props.orgs,
      newOrgs: localResponse.orgs,
      newTags: localResponse.tags,
      username,
      password
    })
  }

  handleChange = (value) => {
    this.setState({
      value: value,
      open: false,
      open1: false
    });
  };

  handleClick = (org) => {
    let newOrgs = this.state
    console.log(newOrgs.newOrgs[org])
    // console.log()
    // if(orgs[org])
    if (newOrgs.newOrgs[org]) {
      this.setState({
        open1: true,
        selectedOrgId: org,
        selectedNewOrg: newOrgs.newOrgs[org]
      })
    }
    else {
      alert("to show more info please go to the orgs main page");
    }
  }

  showOrgDetails = () => {
    let { selectedNewOrg } = this.state
    return (
      <div>
        <p>Name: {selectedNewOrg["name"]}</p>
        <p>Description: {selectedNewOrg["description"]}</p>
      </div>
    )
  }

  handleDeletOrg = (event) => {
    this.sendRequest('delete', 'remove').then(() => {
      this.refreshNewOrgs()
    }).then(() => {
      this.setState({ open: false })

    window.location.reload()
    }) 
    // this.forceUpdate()
    // alert("deleted")
  }

  handleConfirmOrg = ()=> {
    this.sendRequest('put', 'approve').then(() => {
      this.refreshNewOrgs()
    }).then(() => {
      this.setState({ open: false })
      window.location.reload()
    })

  }

  handleDialogClose = () => {
    this.setState({ open: false, open1: false });
  };

  refreshNewOrgs() {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('Post', `${this.serverLink}login`, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          // console.log('readyState')
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response)
            reactLocalStorage.setObject('response', response)
            reactLocalStorage.setObject('status', xhr.status)
            this.setState({ response: JSON.parse(xhr.response) })
            Object.assign({}, this.state.newOrgs, response.orgs)
            res()
          }
          this.setState(Object.assign({}, this.state, { status: xhr.status }));
        }
      };
      xhr.send(JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        status: xhr.status
      }));
    })
  }


  sendRequest = (method, path) => {
    console.log(this.state.selectedOrgId)
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.props.serverLink}${path}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${this.myToken}`);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.setState(Object.assign({}, this.state, {
              status: xhr.status,
            }));
            res()
          }
          this.setState(Object.assign({}, this.state, {
            status: xhr.status,
          }));

        }
      };
      xhr.send(JSON.stringify({ orgId: this.state.selectedOrgId }));
    })
  }


  renderOrgs = (orgs) => {
    return (
      <div className="orgContainer">
        {Object.keys(orgs).map(org => {
          let orgObject = orgs[org]
          
          return (
            <Chip
            key={org}
              value={org}
              onRequestDelete={(e) => {
                this.setState({ selectedOrgId: org, open: true })
              }}
              onClick={(e, value) => this.handleClick(org)}
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
    const actions1 = [
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

    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleConfirmOrg}
      />,
    ]
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
            <Tab label="Active Organizations" className="tabs__header" value="a">
              <div>
                <h2 style={styles.headline}>Active Organizations:</h2>
                {this.renderOrgs(orgs)}
              </div>
            </Tab>
            <Tab label="Requests"  className="tabs__header" value="b" icon={<Badge
              className="badge"
              badgeContent={Object.keys(newOrgs).length}
              secondary={true}
              badgeStyle={{ top: 1, right: 1, backgroundColor:"#ed2f25" }}
            >
            </Badge>}>
              {this.renderOrgs(newOrgs)}
            </Tab>

          </Tabs>
        </SwipeableViews>
        <Dialog
          title="Dialog With Actions"
          actions={actions1}
          modal={false}
          open={this.state.open}
        // onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this organization ?
        </Dialog>
        <Dialog
          title="Confirm"
          actions={actions2}
          modal={false}
          open={this.state.open1}
        // onRequestClose={this.handleClose}
        >
          {this.showOrgDetails()}
        </Dialog>
        <FlatButton
          label="Log out"
          primary={true}
          onClick={() => { console.log(this); localStorage.clear(); window.location.reload() }}
        />
      </div>
    );
  }
}

export default Admin;