import React from 'react';

class Actor extends React.Component {

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
                        <div>
                            <img 
                            className="ui centered image" 
                            src={this.props.profilePathSmall} 
                            style={{width: 150, height: 225}} 
                            alt={this.props.actorName}
                            />
                        </div>
                        <div>{this.props.actorName}</div>
                    </div>
                </div>       
        )
    }
}

export default Actor;