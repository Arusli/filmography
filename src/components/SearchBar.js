import React from 'react';

class SearchBar extends React.Component {

    state = {
        searchterm: 'ex. matt damon...',
        displayterm: ''
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
            <div className="ui container">
                <div className="grid">
                    <h3 className="ui basic segment center aligned">Filmography of: {this.state.displayterm}</h3>  
                    <form className="ui fluid input" onSubmit={this.onSubmit}> 
                        <input type="text" onChange={this.onInputChange} value={this.state.searchterm} />
                    </form>
                </div>
            </div>         
        )
    }
}

export default SearchBar;