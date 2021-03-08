import React from 'react';
const imageBaseUrlLarge = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const imageBaseUrlSmall = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2';
const blankProfile = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
class Results extends React.Component {

   mapArray(e) {
       if (e.profile_path) {
            return (
                <div>
                    <div><img src={imageBaseUrlSmall + e.profile_path} /></div>
                    <div>{e.name}</div>
                </div>   
            )
       } else {
           return (
               <div>
                    <div><img src={blankProfile} style={{width: 150, height: 225}} /></div>
                    <div>{e.name}</div>
               </div>
           )
       }
      
   }

    render() {
        console.log(this.props.personArray);
        return (
            <div>
                {this.props.personArray.map(this.mapArray, this)}
            </div>

        )  
    }
}

export default Results;