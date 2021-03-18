import React from 'react';
import axios from 'axios';
import Films from './Films';

const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const blank = 'https://cdn-d8.nypl.org/s3fs-public/styles/hero_header_focal_point_320x400/public/2020-07/background-hero-image2_3.png?h=ef32067e&itok=2c3EYYaK'

class Actor extends React.Component {

    state = {
        actorId: this.props.actorId,
        actorImage: this.props.profilePath,
        actorBio: '',
        actorName: this.props.actorName,
        profileUrl: this.props.profilePath,
        filmArray: []
    }

    // changeDefaultImage = async () => {
    //     const imageResponse = await axios.get(`https://api.themoviedb.org/3/person/${this.state.actorId}/images`, {
    //         params: {
    //             api_key: key,
    //         }
    //     });

    //     if (imageResponse.data.profiles.length > 0) {
    //         this.setState({
    //             imageUrl: imageBaseUrlLarge + imageResponse.data.profiles[0].file_path,
    //             imageUrlSmall: imageBaseUrlSmall + imageResponse.data.profiles[0].file_path
    //         });
  
    //     } else {
    //         this.setState({
    //             imageUrl: blankProfilePhoto,
    //             imageUrlSmall: blankProfilePhoto
    //         });
    //     };
    // }
//end: creates default actor image for use in imageless films //

//sorts film array and removes duplicates
//     removeDuplicatesAndSort(array) {
//         const mappedArray = array.map( (item) => {
//             return item.id;
//         })

//         const filteredArray = array.filter( (item, index) => {
//            return mappedArray.indexOf(mappedArray[index]) === array.indexOf(item);
//          })
        
//         const sortedArray = filteredArray.sort( (a,b) => {
//             return b.popularity - a.popularity;
//         })

//         return sortedArray;
//     }

//     getCreditsAndBio = async () => {
//         const response2 = await axios.get(`https://api.themoviedb.org/3/person/${this.props.actorId}/combined_credits`, {
//             params: {
//                 api_key: key
//             }
//         })
        
//         const response3 = await axios.get(`https://api.themoviedb.org/3/person/${this.props.actorId}`, {
//             params: {
//                 api_key: key
//             }
//         })

//         const array = this.removeDuplicatesAndSort(response2.data.cast);

//         this.setState({filmArray: array}); //movies/tv shows in which this person was in the CAST!
        
//         if (response3.data.biography) {
//             this.setState({
//                 actorBio: response3.data.biography,
//                 });
//         } else {
//             this.setState({
//                 actorBio: 'Biography unavailable.',
//             });
//         }
//     }

//     changeFilms() {
//         this.getCreditsAndBio();
//         // this.changeDefaultImage();
//     }

//    onClick = async (event) => {
//             // await this.setState({actorId: event.currentTarget.dataset.actorid});
//             await 
//             await this.setState({filmArray: []});
//             this.changeFilms();
//             this.setState({resultsDisplay: 'none'}); //hides SearchResults component

//         };

    click = () => {
        this.props.matchState(this.props);
        this.props.click();
    }

    render() {
        return (
                <div 
                className="column" 
                onClick={this.click} 
                style={{cursor:'pointer'}} 
                key={this.props.actorId} 
                >
                    <div className="ui center aligned segment">
                        <div><img className="ui centered image" src={this.props.profilePath} style={{width: 150, height: 225}} /></div>
                        <div>{this.props.actorName}</div>
                    </div>
                </div>       
        )
    }
}

export default Actor;