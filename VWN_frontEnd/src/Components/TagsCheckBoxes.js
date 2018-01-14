import React, { Component } from 'react'
import Observable from '../Observable'
import MenuItem from 'material-ui/MenuItem';
import '../CSS/Tags.css';
class TagsCheckBoxes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: {},
      activeTags: {}
    }
  }

  componentWillMount() {
    this.setState({
      tags: this.props.tags,
      activeTags: this.props.activeTags
    })
  }

  render() {
    const style = {
      margin: 0,
      textAlign: 'center',
      backgroundColor: '#e9e8e3',
      fontFamily: 'Open Sans'

    };
    const {tags,activeTags} = this.state
    return (
      <div className='tags'>
        {Object.keys(tags).map(tag => {
          return (
            <MenuItem key={tag}>
              <label >
                <input
                  defaultChecked={activeTags[tag] ? true : false}
                  type='checkbox'
                  value={tag}
                  onChange={this.props.handle}
                  style={style}
                />
                {tags[tag]}
              </label>
            </MenuItem>
          )
        })}
      </div>
    )
  }
}

export default TagsCheckBoxes