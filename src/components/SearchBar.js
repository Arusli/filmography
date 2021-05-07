import React from 'react';

class SearchBar extends React.Component {

    state = {
        initial: true,
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
        this.setState({searchterm: '', initial: false});
    }

    render() {
        if (this.state.initial) { //for the very first search, sets the searchbar in the middle of the page.
            return (
                <div>
                    <h1 className="ui basic segment center aligned" style={{color: "cornflowerblue"}}>FILMOGRAPHY FINDER</h1>
                    <div style={{minHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="ui center aligned container">
                            <form className="ui center aligned huge input focus" onSubmit={this.onSubmit}> 
                                <input type="text" placeholder="ex. matt damon" onChange={this.onInputChange} value={this.state.searchterm} />
                            </form>
                            <h4>(search an actor...)</h4>
                        </div>
                    </div>       
                </div>  
            )
        } else {
            return (
                <div className="ui container" style={{marginBottom: "50px"}}>
                    <div className="ui center aligned container">
                        <h1 className="ui basic segment center aligned" style={{color: "cornflowerblue"}}>Filmography Finder</h1>  
                        <form className="ui center aligned huge input focus" onSubmit={this.onSubmit}> 
                            <input type="text" placeholder="ex. matt damon..." onChange={this.onInputChange} value={this.state.searchterm} />
                        </form>
                    </div>
                </div>         
            )
        }
    }
}

export default SearchBar;