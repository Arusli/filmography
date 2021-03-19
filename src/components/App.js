import React from 'react';
import SearchBar from './SearchBar';
import SearchResults2 from './SearchResults2';
import Films from './Films';
import axios from 'axios';

// link: https://developers.themoviedb.org/3/search/search-movies
//photo endpoints:
// https://www.themoviedb.org/t/p/w150_and_h225_bestv2/
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/65TtWF5yOHnd5O6CiZGoezaBBgl.jpg

const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
// const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blank = 'https://cdn-d8.nypl.org/s3fs-public/styles/hero_header_focal_point_320x400/public/2020-07/background-hero-image2_3.png?h=ef32067e&itok=2c3EYYaK'

class App extends React.Component {

    state = {
        response: null,
        actorId: null,
        searchTerm: '',
        searchResults: [],
        personArray: [],
        filmArray: [],
        actorBio: '',
        actorName: '',
        profileUrl: '',
        resultsDisplay: 'none',
        blank: blank
    };

    //makes get requests for results of searching an actor
    onSubmit = async (term) => {
        const personArray = [];
        const response = await axios.get('https://api.themoviedb.org/3/search/person', {
            params: {
                api_key: key,
                query: term
            } 
        })


        this.setState({
            filmArray: [], //clears film array of previous search
            response: response.data, //data contains all the results for a search i.e. smith
            searchResults: response.data.results,
            resultsDisplay: 'inline', //reveals SearchResults component. Switch to none when hiding component.
            searchTerm: term.toUpperCase()
        });


        //creates array of data objects, object per result
        this.state.searchResults.forEach(
            (e) => {
                personArray.push({name: e.name, id: e.id, profile_path: e.profile_path});
            });

        this.setState({personArray: personArray}); 

    }; //end onSubmit


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
    }
   

    //pass as prop to SearchResults
    click = async () => {
        await this.setState({filmArray: []});
        this.changeFilms();
        this.setState({resultsDisplay: 'none'}); //hides SearchResults component
    };
 
    //this was the key to pass props up from child to parent component
    matchState = (props) => {
        this.setState({
            actorId: props.actorId,
            actorBio: props.actorBio,
            actorName: props.actorName,
            actorImage: props.actorImage,
            profileUrl: props.profilePathLarge,
            filmArray: props.filmArray
        })
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.onSubmit} display={this.state.resultsDisplay} />
                <SearchResults2 
                    personArray={this.state.personArray} 
                    display={this.state.resultsDisplay} 
                    searchTerm={this.state.searchTerm}
                    matchState={this.matchState}
                    click={this.click}
                />
                <Films 
                    filmArray={this.state.filmArray} 
                    actorImage={this.state.profileUrl} 
                    actorBio={this.state.actorBio} 
                    actorName={this.state.actorName}
                    blank={this.state.blank}
                />
            </div>
            
        );
    };
};

export default App;