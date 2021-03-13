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
            filmArray: [],
            response: response.data, 
            personResults: response.data.results
        });


        this.state.personResults.forEach(
            (e) => {
                personArray.push({name: e.name, id: e.id, profile_path: e.profile_path});
            });

        this.setState({personArray: personArray});

    }; //end onSubmit


//creates default actor image for use in imageless films //
    changeDefaultImage = async () => {
        const imageResponse = await axios.get(`https://api.themoviedb.org/3/person/${this.state.actorId}/images`, {
            params: {
                api_key: key,
            }
        });

        if (imageResponse.data.profiles.length > 0) {
            this.setState({
                imageUrl: imageBaseUrlLarge + imageResponse.data.profiles[0].file_path,
                imageUrlSmall: imageBaseUrlSmall + imageResponse.data.profiles[0].file_path
            });
  
        } else {
            this.setState({
                imageUrl: blankProfile,
                imageUrlSmall: blankProfile
            });
        };
    }
        
//end: creates default actor image for use in imageless films //


    getCredits = async () => {
        const response2 = await axios.get(`https://api.themoviedb.org/3/person/${this.state.actorId}/combined_credits`, {
            params: {
                api_key: key
            }
        })
           
        this.setState({filmArray: response2.data.cast}); //movies in which this person was in the CAST!
        console.log(response2.data);
    }

    changeFilms() {
        this.getCredits();
        this.changeDefaultImage();
    }
   

    //pass as prop
    onClick = async (e) => {
        await this.setState({actorId: e.currentTarget.id});
        await this.setState({filmArray: []});
        this.changeFilms();
    };
 
 

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.onSubmit} />
                <br />
                <br />
                <Results image={this.state.imageUrl} personArray={this.state.personArray} click={this.onClick} />
                <br />
                <br />
                <Films filmArray={this.state.filmArray} actorImage={this.state.imageUrlSmall} />
            </div>
            
        );
    };
};

export default App;