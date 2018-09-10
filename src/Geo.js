//import geo from 'geolocation';
import React, { Component } from 'react';

class Geo extends Component {
    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        status: 'start',
     }
     watchID = null;

    // Promise Interface can ensure load the script only once.
    my_script = () => {
        new_script('https://maps.googleapis.com/maps/api/js?key=AIzaSyBfESC81uMc_95Pks4CU3iy23a9R7wPzcA');
    } 

     do_load = () => {
         var self = this;
         this.my_script.then(function() {
             self.setState({'status': 'done'});
         }).catch(function() {
             self.setState({'status': 'error'});
         })
     }
  
     componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(JSON.stringify(position.coords.latitude));
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
        
        this.map = new google.maps.Map(this.mapElement, {
            zoom: 8,
            center: {
                lat: 51.5085300,
                lng: -0.1257400
            }
        });

        
     }
     componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
     }
    
    render() {
        var self = this;
        if(self.statue.status === 'start') {
            self.state.status = 'loading';
            setTimeout(function() {
                self.do_load()
            }, 0);
        }

        return( 
            <div>
                <div>Initial Position: {this.state.initialPosition}</div>
                <div>Last Position: {this.state.lastPosition}</div>
                <div className ="map" ref={self.state.status === 'done' && this.setMapElementReference}></div>
            </div>
            
        )
    }

    setMapElementReference = () => {
        (mapElementReference) => {
            this.mapElement = mapElementReference;
        }
    }
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

// AIzaSyBfESC81uMc_95Pks4CU3iy23a9R7wPzcA

function new_script(src) {
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    })
  };

  