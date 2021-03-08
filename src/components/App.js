import React from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import Films from './Films';
import axios from 'axios';


const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blankProfile = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
// link: https://developers.themoviedb.org/3/search/search-movies

//photo endpoints:
// https://www.themoviedb.org/t/p/w150_and_h225_bestv2/
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/65TtWF5yOHnd5O6CiZGoezaBBgl.jpg
class App extends React.Component {

    state = {
        response: null,
        personId: null,
        actorId: null,
        personResults: [],
        personArray: [],
        imageUrl: '',
        imageUrlSmall: '',
        filmArray: []
    };

    onSubmit = async (term) => {
        const personArray = [];
        const response = await axios.get('https://api.themoviedb.org/3/search/person', {
            params: {
                api_key: key,
                query: term
            } 
        })

        this.setState({
            response: response.data, 
            personId: response.data.results[0].id,
            personResults: response.data.results
        });

        console.log(this.state.personResults, this.state.personId); //1892

        this.state.personResults.forEach(
            (e) => {
                personArray.push({name: e.name, id: e.id, profile_path: e.profile_path});
            });

        this.setState({personArray: personArray});
        console.log(this.state.personArray);



//creates default actor image for use in imageless films //
        const imageResponse = await axios.get(`https://api.themoviedb.org/3/person/${this.state.personId}/images`, {
            params: {
                api_key: key,
            }
        });

        console.log(imageResponse);

        if (imageResponse.data.profiles.length > 0) {
            this.setState({
                imageUrl: imageBaseUrlLarge + imageResponse.data.profiles[0].file_path,
                imageUrlSmall: imageBaseUrlSmall + imageResponse.data.profiles[0].file_path
            });
            console.log(this.state.imageUrl)
        } else {
            this.setState({
                imageUrl: blankProfile,
                imageUrlSmall: blankProfile
            });
        };
//end: creates default actor image for use in imageless films //

        //the following needs to work of onClick of the result image, separate function

        const response2 = await axios.get(`https://api.themoviedb.org/3/person/${this.state.personId}/movie_credits`, {
            params: {
                api_key: key
            }
        })

       
        this.setState({filmArray: response2.data.cast})
        console.log(this.state.filmArray)

    }; //end onSubmit

    //pass as prop
    onClick = (e) => {
        this.setState({actorId: e.currentTarget.id});
    };
 
    render() {
        console.log(this.state.actorId)
        console.log(this.state.personId);
        return (
            <div>
                <SearchBar onSubmit={this.onSubmit} />
                <Results image={this.state.imageUrl} personArray={this.state.personArray} click={this.onClick} />
                <Films filmArray={this.state.filmArray} actorImage={this.state.imageUrlSmall} />
            </div>
            
        );
    };
};

export default App;