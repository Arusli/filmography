import React from 'react';
import axios from 'axios';
import Films from './Films';

const key = 'b48c4b54c6c63147c8e82f9fe931740c';
const blank = 'https://cdn-d8.nypl.org/s3fs-public/styles/hero_header_focal_point_320x400/public/2020-07/background-hero-image2_3.png?h=ef32067e&itok=2c3EYYaK'

class Actor extends React.Component {

    state = {
        // actorId: this.props.actorId,
        // actorImage: this.props.profilePath,
        // actorBio: '',
        // actorName: this.props.actorName,
        // profileUrl: this.props.profilePath,
        // filmArray: []
    }

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