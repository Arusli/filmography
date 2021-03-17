import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchResults2 from './SearchResults2';
import Films from './Films';
import axios from 'axios';


const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blankProfilePhoto = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
const blank = 'https://cdn-d8.nypl.org/s3fs-public/styles/hero_header_focal_point_320x400/public/2020-07/background-hero-image2_3.png?h=ef32067e&itok=2c3EYYaK'
// link: https://developers.themoviedb.org/3/search/search-movies

//photo endpoints:
// https://www.themoviedb.org/t/p/w150_and_h225_bestv2/
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/65TtWF5yOHnd5O6CiZGoezaBBgl.jpg
class App extends React.Component {

    state = {
        response: null,
        actorId: null,
        searchTerm: '',
        searchResults: [],
        personArray: [],
        imageUrl: '',
        imageUrlSmall: '',
        filmArray: [],
        actorBio: '',
        resultsDisplay: 'none',
        actorName: '',
        profileUrl: '',
        profileUrl2: '',
        blank: blank
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
            filmArray: [], //clears film array for previous search
            response: response.data, //data contains all the results for a search i.e. smith
            searchResults: response.data.results,
            resultsDisplay: 'inline', //allows toggling between display inline and none, allowing hiding of component
            searchTerm: term.toUpperCase()
        });


        this.state.searchResults.forEach(
            (e) => {
                personArray.push({name: e.name, id: e.id, profile_path: e.profile_path});
            });

        this.setState({personArray: personArray}); //array of objects of data for each search result

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
                imageUrl: blankProfilePhoto,
                imageUrlSmall: blankProfilePhoto
            });
        };
    }
//end: creates default actor image for use in imageless films //

    removeDuplicatesAndSort(array) {
        const mappedArray = array.map( (item) => {
            return item.id;
        })

        const filteredArray = array.filter( (item, index) => {
           return mappedArray.indexOf(mappedArray[index]) === array.indexOf(item);
         })
        
        const sortedArray = filteredArray.sort( (a,b) => {
            return b.popularity - a.popularity;
        })

        return sortedArray;
    }

    getCreditsAndBio = async () => {
        const response2 = await axios.get(`https://api.themoviedb.org/3/person/${this.state.actorId}/combined_credits`, {
            params: {
                api_key: key
            }
        })
        
        const response3 = await axios.get(`https://api.themoviedb.org/3/person/${this.state.actorId}`, {
            params: {
                api_key: key
            }
        })

        const array = this.removeDuplicatesAndSort(response2.data.cast);

        this.setState({filmArray: array}); //movies/tv shows in which this person was in the CAST!
        
        if (response3.data.biography) {
            this.setState({
                actorBio: response3.data.biography,
                actorName: response3.data.name,
                profileUrl: imageBaseUrlLarge + response3.data.profile_path,
                actorName: response3.data.name
                });
        } else {
            this.setState({
                actorBio: 'Biography unavailable.',
                actorName: response3.data.name
            });
        }
    }

    changeFilms() {
        this.getCreditsAndBio();
        this.changeDefaultImage();
    }
   

    //pass as prop
    onClick = async (event) => {
        await this.setState({actorId: event.currentTarget.dataset.actorid});
        await this.setState({filmArray: []});
        this.changeFilms();
        this.setState({resultsDisplay: 'none'}); //hides SearchResults component
    };
 

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.onSubmit} display={this.state.resultsDisplay} />
                <SearchResults2 />
                <SearchResults 
                    image={this.state.imageUrl} 
                    personArray={this.state.personArray} 
                    click={this.onClick} 
                    display={this.state.resultsDisplay} 
                    searchTerm={this.state.searchTerm}
                    />
                <Films 
                    filmArray={this.state.filmArray} 
                    actorImage={this.state.imageUrlSmall} 
                    actorBio={this.state.actorBio} 
                    name={this.state.actorName}
                    blank={this.state.blank}
                />
            </div>
            
        );
    };
};

export default App;