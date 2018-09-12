import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleApiWrapper} from 'google-maps-react';
//import cache from 'google-maps-react/dist/lib/ScriptCache'

export class Container extends React.Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        
        
        // if(!this.props.loaded) {
        //     return <div>Loading...<Map google={this.props.google} /></div> 
        // }
        return (
            <div style = {style}>
                <Map google={this.props.google} />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBfESC81uMc_95Pks4CU3iy23a9R7wPzcA')
})(Container)


export class Map extends React.Component {
    
    componentDidUpdate(prevProps, prevState) {
        console.log("in componentDidUpdate props: " + JSON.stringify(prevProps))
        if(prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    componentDidMount() {
        console.log("in componentDidMount")
        this.loadMap();
    }

    loadMap() {
        console.log("In loadMap()");
        if(this.props && this.props.google) {
            console.log("In loadMap() google available");
            //google is available
            const {google} = this.props;
            console.log(this.props);
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let{initialCenter, zoom} = this.props;
            const {lat, lng} = initialCenter;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        return (
            <div ref='map'>
                Loading map...
            </div>
        )
    }

}
Map.propTypes = {
    // google: React.propTypes.Object,
    // zoom: React.propTypes.number,
    // initialCenter: React.propTypes.object
}
Map.defaultProps = {
    zoom: 13,
    initialCenter: {
        lat: 37.774929,
        lng: -122.419416
    }
}

// this.scriptCache = cache({
//     google: 'https://maps.googleapis.com/maps/api/js'
// });