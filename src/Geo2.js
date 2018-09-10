//import geo from 'geolocation';
import React, { Component } from 'react';

class Geo extends Component {
    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        // status: 'start',
     }
     watchID = null;

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
        

        // this.map = new google.maps.Map(this.mapElement, {
        //     zoom: 8,
        //     center: {
        //         lat: 51.5085300,
        //         lng: -0.1257400
        //     }
        // });

        
     }
     componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
     }
     

    
    render() {
        // var self = this;
        // if(self.statue.status === 'start') {
        //     self.state.status = 'loading';
        //     setTimeout(function() {
        //         self.do_load()
        //     }, 0);
        // }

        return( 
            <div>
                <div>Initial Position: {this.state.initialPosition}</div>
                <div>Last Position: {this.state.lastPosition}</div>
                <Map />
                {/* <div className ="map" ref={self.state.status === 'done' && this.setMapElementReference}></div> */}
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

const ARC_DE_TRIOMPHE_POSITION = {
    lat: 48.873947,
    lng: 2.295038
};
const EIFFEL_TOWER_POSITION = {
    lat: 48.858608,
    lng: 2.294471
};

class Map extends React.Component {
    constructor() {
        super();
        this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
    }
    componentDidMount() {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: EIFFEL_TOWER_POSITION,
            zoom: 16
          });
        //window.initMap = this.initMap;
        //loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBfESC81uMc_95Pks4CU3iy23a9R7wPzcA');
      }

      initMap = () => {
        
        //map = new google.maps.Map(this.refs.map.getDOMNode())
      }
      
      panToArcDeTriomphe() {
        console.log(this)
        this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
      }
      
      render() {
        const mapStyle = {
          width: 500,
          height: 300,
          border: '1px solid black'
        };
        
        return (
          <div>
            <button onClick={this.panToArcDeTriomphe}>Go to Arc De Triomphe</button>
            <div ref="map" style={mapStyle}>I should be a map!</div>
          </div>
        );
      }
}

// ReactDOM.render(
//     <Map />,
//     document.getElementById('root')
// );

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

  
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}