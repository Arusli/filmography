import React from 'react';

class Results extends React.Component {


    render() {
        console.log('results', this.props.image);
        return (
            <div>
                <img src={this.props.image} />
            </div>

        )
    }
}

export default Results;