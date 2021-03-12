import React from 'react';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blankProfile = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
class Results extends React.Component {


    //should change this.state.personId, which will be used to change the Films display.
    //use callback to send data from this onclick to App.js (with props)
    // onClick = (e) => {
    //     this.setState({personId: e.currentTarget.id});
    // }

   mapArray(e) {
       if (e.profile_path) {
            return (
                <div onClick={this.props.click} style={{cursor:'pointer'}} id={e.id} > 
                    <div><img src={imageBaseUrlSmall + e.profile_path} /></div>
                    <div>{e.name}</div>
                </div>   
            )
       } else {
           return (
               <div onClick={this.props.click} style={{cursor:'pointer'}} id={e.id}>
                    <div><img src={blankProfile} style={{width: 150, height: 225}} /></div>
                    <div>{e.name}</div>
               </div>
           )
       }
      
   }

    render() {
        return (
            <div className="ui container">
                <div className="ui grid container">
                    {this.props.personArray.map(this.mapArray, this)}
                </div>
            </div>

        )  
    }
}

export default Results;