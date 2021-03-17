import React from 'react';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blankProfile = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
class Results extends React.Component {

    state = {hello: 'hello'}
    //adjust state here with onclick. pass this state to app.js with a callback prop, e.g. this.props.adjustState(this.state.state)

//BIG QUESTION: Is there a way to pass the e.id below in another way other than assigning it to the id of the div??

   mapArray(e) {
       if (e.profile_path) {
            return (
                <div className="column" onClick={this.props.click} style={{cursor:'pointer'}} id={e.id} key={e.id} > 
                    <div className="ui center aligned segment">
                        <div><img className="ui centered image" src={imageBaseUrlSmall + e.profile_path} /></div>
                        <div>{e.name}</div>
                    </div>
                </div>   
            )
       } else {
           return (
               <div className="column" onClick={this.props.click} style={{cursor:'pointer'}} id={e.id} key={e.id} >
                    <div className="ui center aligned segment">
                        <div><img className="ui centered image" src={blankProfile} style={{width: 150, height: 225}} /></div>
                        <div>{e.name}</div>
                    </div>
               </div>
           )
       }
      
   }

    render() {
        return (
            <div style={{display: this.props.display}}>
                <div style={{margin: "20px"}} className="ui container">
                    <h5>Results for: {this.props.searchTerm}</h5>
                </div>
                <div className="ui stackable four column grid">
                    {this.props.personArray.map(this.mapArray, this)}
                </div>
            </div>

        )  
    }
}

export default Results;