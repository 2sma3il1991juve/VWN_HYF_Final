import React, { Component } from 'react';
import Tags from './Tags';
import RegionSearch from './RegionSearch';
import '../CSS/FiltersSidBar.css'

export default class FiltersSidBar extends Component {
    render() {
        return (
            <div className="Filters">
                <p className="FilterTabName">Filter</p>
                <RegionSearch />
                <Tags tags={this.props.tags} />
            </div>
        )
    }
}