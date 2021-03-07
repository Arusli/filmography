import React from 'react';

const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';

class Films extends React.Component {
    
    // this.props.filmArray[0][0].title
    render() {
        if (this.props.filmArray.length > 0) {
            return (
                <div>
                    <div>{this.props.filmArray[0].title}</div>
                    <img src={imageBaseUrlSmall + this.props.filmArray[0].poster_path} />
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