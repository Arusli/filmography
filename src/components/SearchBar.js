import React from 'react';

class SearchBar extends React.Component {

    state = {
        searchterm: 'ex. matt damon...',
        displayterm: '',
    };

    onInputChange = (event) => {
        this.setState({searchterm: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchterm);
        this.setState({displayterm: this.state.searchterm.toUpperCase()})
        this.setState({searchterm: ''});
    }

    render() {
        return (
            <div>
                <h3>Filmography of: {this.state.displayterm}</h3>  
                <form onSubmit={this.onSubmit}> 
                    <input type="text" onChange={this.onInputChange} value={this.state.searchterm} />
                </form>
            </div>         
        )
    }
}

export default SearchBar;