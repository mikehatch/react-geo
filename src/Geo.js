//import geo from 'geolocation';
import React, { Component } from 'react';
import {Container, Map} from './Map2.js';

class Geo extends Component {
    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        status: 'start',
     }
     watchID = null;


     componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //console.log(JSON.stringify(position.coords.latitude));
                const initialPosition = JSON.stringify(cloneAsObject(position));
                this.setState({ initialPosition });
           },
           (error) => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lastPosition = JSON.stringify(cloneAsObject(position));
            this.setState({ lastPosition });
           
        });
                
     }
     componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
     }
    
    render() {
        
        return( 
            <div>
                <div>Initial Position: {this.state.initialPosition}</div>
                <div>Last Position: {this.state.lastPosition}</div>
                <Container><Map /></Container>
            </div>
            
        )
    }

    // setMapElementReference = () => {
    //     (mapElementReference) => {
    //         this.mapElement = mapElementReference;
    //     }
    // }
    // (setMapElementReference): function(mapElementReference) {
    //     this.mapElement = mapElementReference;
    // }

}

export default Geo;

function cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key]);
    }
    return temp;
}

// function new_script(src) {
//     return new Promise(function(resolve, reject){
//       var script = document.createElement('script');
//       script.src = src;
//       script.addEventListener('load', function () {
//         resolve();
//       });
//       script.addEventListener('error', function (e) {
//         reject(e);
//       });
//       document.body.appendChild(script);
//     })
//   };

  