import React from 'react';

class SearchBar extends React.Component {

    state = {
        searchterm: '',
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
            <div className="ui container" style={{marginBottom: "50px"}}>
                <div>
                    <h1 className="ui basic segment center aligned">Filmography Finder</h1>  
                    <form className="ui fluid input focus" onSubmit={this.onSubmit}> 
                        <input type="text" placeholder="ex. matt damon..." onChange={this.onInputChange} value={this.state.searchterm} />
                    </form>
                </div>
                <div style={{marginTop: "20px"}}>
                    <h5 style={{display: this.props.display}}>Results for: {this.state.displayterm}</h5>
                </div>
            </div>         
        )
    }
}

export default SearchBar;