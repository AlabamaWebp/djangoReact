import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.setSearch(event.target.value)
    }
    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    // value={this.state.search}
                    onChange={this.handleChange}
                    placeholder="Поиск по записи..."
                    style={{ fontSize: 22 }}
                    className="search3"
                />
                {/* <button onClick={this.handleSubmit} className="search2">
                    Искать
                </button> */}
            </div>
        )
    }
}
