import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            searchValue: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.yelpSearch(this.state.searchValue);
    }

    render() {
        return (
            <form  onSubmit={this.handleSubmit} >
                <input 
                type='search' 
                value={this.state.searchValue} 
                onChange={this.handleChange} 
                />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default SearchBar;