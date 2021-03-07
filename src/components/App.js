import React from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import Films from './Films';
import axios from 'axios';


const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
// link: https://developers.themoviedb.org/3/search/search-movies

//photo endpoints:
// https://www.themoviedb.org/t/p/w150_and_h225_bestv2/
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/65TtWF5yOHnd5O6CiZGoezaBBgl.jpg
class App extends React.Component {

    state = {
        response: null,
        personId: null,
        imageUrl: '',
        filmArray: []
    };

    onSubmit = async (term) => {
       const response = await axios.get('https://api.themoviedb.org/3/search/person', {
            params: {
                api_key: key,
                query: term
            } 
        })

        this.setState({response: response.data, personId: response.data.results[0].id});
        // console.log(this.state.response, this.state.personId); //1892

        const imageResponse = await axios.get(`https://api.themoviedb.org/3/person/${this.state.personId}/images`, {
            params: {
                api_key: key,
            }
        })

        console.log(imageResponse);
        this.setState({imageUrl: imageBaseUrlLarge + imageResponse.data.profiles[0].file_path});
        console.log(this.state.imageUrl);

        const response2 = await axios.get(`https://api.themoviedb.org/3/person/${this.state.personId}/movie_credits`, {
            params: {
                api_key: key
            }
        })

        console.log(response2.data.cast);
        this.setState({filmArray: response2.data.cast})

    } //end onSubmit


 
    render() {
        return (
            <div>
                <SearchBar onSubmit={this.onSubmit} />
                <Results image={this.state.imageUrl} />
                <Films filmArray={this.state.filmArray} />
            </div>
            
        );
    };
};

export default App;