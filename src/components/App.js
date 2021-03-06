import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';


// const key = 'b48c4b54c6c63147c8e82f9fe931740c';
class App extends React.Component {

    onSubmit = async (term) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
            params: {
                userId: term
            } 
        })

        console.log(response.data);
    }


 
    render() {
        return (
            <div>
                <SearchBar onSubmit={this.onSubmit} />
            </div>
            
        );
    };
};

export default App;