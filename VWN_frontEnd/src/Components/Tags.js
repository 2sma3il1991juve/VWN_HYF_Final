import React, { Component } from 'react'
import Observable from '../Observable';
import TagsCheckBoxes from './TagsCheckBoxes';
import '../CSS/Tags.css';
class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTags: {},
      open: false
    }
  }

  componentWillMount() {
    this.setState({ activeTags: Observable.getHash("t") })
  }

  handleCheckbox = (event) => {
    let { activeTags } = this.state
    if (event.target.checked) {
      activeTags[event.target.value] = true
    } else {
      activeTags[event.target.value] = false
    }
    Observable.setHash('t', activeTags)
    Observable.updateState('Observable', 'activeTags', activeTags)
  }

  render() {
    const { open } = this.state
    return (
      <TagsCheckBoxes tags={this.props.tags} activeTags={this.state.activeTags} handle={this.handleCheckbox} />
    )
  }
}

export default Tags;