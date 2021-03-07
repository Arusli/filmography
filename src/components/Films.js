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
            if (element.poster_path === null) {
                return (
                    <div key={element.id}>
                    <img src={this.props.actorImage} alt={element.title} /> 
                    <h3>{element.title}</h3>
                    <br />
                </div>
                )
            } else {
                return (
                    <div key={element.id}>
                        <img src={imageBaseUrlSmall + element.poster_path} alt={element.title} />
                        <h3>{element.title}</h3>
                        <br />
                    </div>
                )
            }
    }

    // mapImages(element) {
    //         return (
    //             <div>
    //                 <img src={imageBaseUrlSmall + element.poster_path} />
    //                 <h3>{element.title}</h3>
    //                 <br />
    //             </div>
    //         )
    //     }


    // this.props.filmArray[0][0].title
    render() {
        
        console.log(this.props.actorImage);
        console.log(this);

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