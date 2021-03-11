import React from 'react';

const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
class Films extends React.Component {

    constructor(props) {
        super(props);
        this.hello = 'hello';
    }

    //why isn't this definited inside mapImages but it is inside render?
    mapImages(element) {
        if (element.media_type === 'movie') {
            if (!element.poster_path && element.release_date) {
                return (
                    <div key={element.id}>
                        <img src={this.props.actorImage} alt={element.title} /> 
                        <h3>{element.title} ({element.release_date.substr(0,4)})</h3>
                        <br />
                    </div>
                )
            } else if (!element.poster_path && !element.release_date) {
                return (
                    <div key={element.id}>
                        <img src={this.props.actorImage} alt={element.title} /> 
                        <h3>{element.title}</h3>
                        <br />
                    </div>
                )
            } else if (element.poster_path && element.release_date) {
                return (
                    <div key={element.id}>
                        <img src={imageBaseUrlSmall + element.poster_path} alt={element.title} />
                        <h3>{element.title} ({element.release_date.substr(0,4)})</h3>
                        <br />
                    </div>
                )
            } else {
                return (
                    <div key={element.id}>
                        <img src={imageBaseUrlSmall + element.poster_path} alt={element.title} />
                        <h3>{element.title} </h3>
                        <br />
                    </div>
                )
            }
        } else {
            if (!element.poster_path && element.first_air_date) {
                return (
                    <div key={element.id}>
                        <img src={this.props.actorImage} alt={element.name} /> 
                        <h3>{element.name} ({element.first_air_date.substr(0,4)})</h3>
                        <br />
                    </div>
                )
            } else if (!element.poster_path && !element.first_air_date) {
                return (
                    <div key={element.id}>
                        <img src={this.props.actorImage} alt={element.name} /> 
                        <h3>{element.name}</h3>
                        <br />
                    </div>
                )
            } else if (element.poster_path && element.first_air_date) {
                return (
                    <div key={element.id}>
                        <img src={imageBaseUrlSmall + element.poster_path} alt={element.name} />
                        <h3>{element.name} ({element.first_air_date.substr(0,4)})</h3>
                        <br />
                    </div>
                )
            } else {
                return (
                    <div key={element.id}>
                        <img src={imageBaseUrlSmall + element.poster_path} alt={element.name} />
                        <h3>{element.name} </h3>
                        <br />
                    </div>
                )
            }
        }
            
    }



    render() {        
        console.log(this.props.filmArray);

        if (this.props.filmArray.length > 0) {
            return (
                <div>
                    <div>{this.props.filmArray.map(this.mapImages, this)}</div>
                </div>        
            )
        } else {
            return (
                <div>films</div>
            )
        }
        
    }

}

export default Films;