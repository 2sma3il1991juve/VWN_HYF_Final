import React, { Component } from 'react';
import Observable from '../Observable';
import ContactInfo from './ContactInfo'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../CSS/Orgs.css';

class Orgs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orgs: {},
      orgsAfterFilter: {},
      noFilter: true,
    }
  }

  componentWillMount() {
    this.setState({
      orgs: this.props.orgs,
    })
    Observable.subscribe('Observable', this.activeOrgs)
  }



  componentDidMount() {
    Observable.updateState('Observable', 'activeTags', Observable.getHash('t'))
    Observable.updateState('Observable', 'activeRegions', Observable.getHash('r'))
  }

  componentWillUnmount() {
    Observable.unSubscribe('Observable', this.activeOrgs)
  }

  activeOrgs = (data) => {

    if (data.activeTags && data.activeRegions) {
      const { orgs } = this.state
      let filterdOrgsByRegion = this.filterOrgsbyId(orgs, 'regions', data.activeRegions)
      let filterdOrgsByTag = this.filterOrgsbyId(orgs, 'tags', data.activeTags)
      if (Object.keys(filterdOrgsByRegion).length === 0) {
        this.setState({
          orgsAfterFilter: filterdOrgsByTag
        })
      } else if (Object.keys(filterdOrgsByTag).length === 0) {
        this.setState({
          orgsAfterFilter: filterdOrgsByRegion
        })
      } else {
        let orgsAfterFilter = {}
        Object.keys(filterdOrgsByRegion).forEach(rOrg => {
          for (const tOrg in filterdOrgsByTag) {
            if (rOrg === tOrg) {
              orgsAfterFilter[rOrg] = Object.assign({}, orgs[rOrg])
            }
          }
        })
        this.setState({
          orgsAfterFilter: orgsAfterFilter
        })
      }
    }
  }

  filterOrgsbyId = (orgs, filters, activeFilters) => {
    let newFilteredOrgs = {}
    for (const orgId in orgs) {
      let newFilteredOrg = {}
      let org = orgs[orgId]
      org[`${filters}`].forEach(filterId => {   
        if (activeFilters[filterId]) {
          if (newFilteredOrg.name === undefined) {
            newFilteredOrg = Object.assign({}, org)
            newFilteredOrg.id = orgId
          }
        }
      })
      if (newFilteredOrg.name !== undefined) {
        newFilteredOrgs[orgId] = Object.assign({}, newFilteredOrg)
      }
    }
    return newFilteredOrgs
  }

  renderOrgs(orgs) {
    return (
      <div className="orgs">
        {Object.keys(orgs).map(org => {
          console.log(orgs[org])
          return (
            <div className="cardDIV" key={org}>
              <Card
                initiallyExpanded={Observable.getHash("o")[org]}
                onExpandChange={(expanded) => { Observable.setHash("o", Number(org), expanded) }}
                className="card">
                <CardHeader
                  className="cardHeader"
                  title={orgs[org]["name"]}
                  titleStyle={{ color: "#ed2f25" }}
                  subtitle={orgs[org]["contacts"][0]["city"]}
                  avatar={orgs[org]["logo"]}
                  actAsExpander={true}
                  showExpandableButton={false}
                />
                <CardText className="BTNWrap">
                  <div className="BTN">
                    <ContactInfo orgContacts={orgs[org]["contacts"][0]} />
                  </div>
                </CardText>
                <CardMedia
                  className="TheExpandables4"
                  expandable={true}
                  overlay={<CardTitle title={orgs[org]["name"]}
                    subtitle={orgs[org]["contacts"][0]["web"]} />}
                >
                  <img src={orgs[org]["logo"]} alt="Company logo" width="300px" height="200px" />
                </CardMedia >
                <CardTitle className="TheExpandables4" title={orgs[org]["name"]} subtitle={orgs[org]["contacts"][0]["web"]} expandable={true} />
                <CardText className="TheExpandables4" expandable={true}>
                  {orgs[org]["description"]}
                </CardText>
              </Card>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { orgs, orgsAfterFilter } = this.state
    if (Object.keys(Observable.getHash("t")).length === 0 && Object.keys(Observable.getHash("r")).length === 0) {
      return (<div>{this.renderOrgs(orgs)}</div>)
    }
    else {
      return (
        <div>{this.renderOrgs(orgsAfterFilter)}</div>
      )
    }
  }
}

export default Orgs