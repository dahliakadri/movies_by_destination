class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {allCountries: []}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjrTiHH0aahNJznF7Y7OLPwHRRrnO6hQ0&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
    	this.moodyMap = this.createGoogleMap()
      fetch("/countries_with_movies")
            .then(response => response.json())
            .then(response => {
              const {countries} = response
              this.setState({ allCountries: countries})
              const markers = []
              for (const country of this.state.allCountries){
                const marker = this.createMarker(parseFloat(country.country_lat), parseFloat(country.country_lon))
                const markerInfo = '<h1>Test</h1>'
                const infoWindow = this.createInfoWindow(markerInfo)
                marker.addListener('click', () => {
                    const markerInfo = `<h4 id="map-marker-info">Movies from ${country.country_name}</h4>`
                    const infoWindow = this.createInfoWindow(markerInfo)
                    infoWindow.open(this.moodyMap, marker)
                    this.props.moodyMapCallback({"country": country.country_name})
                  })
              }
            })
          })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 3.75,
      zoomControl: true,
      scaleControl: false,
      center: {
        lat: 17.2283,
        lng: 26.3351,
      },
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#cc2a07"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

    })

  createMarker = (itemLat, itemLon) => {
    return new window.google.maps.Marker({
      position: { lat: itemLat, lng: itemLon },
      map: this.moodyMap,
      icon: {
        url: '/static/img/movie_icon_three.png',
        scaledSize: {
          width: 30,
          height: 30
        }
      }
    })
  }

  createInfoWindow = (markerInfo) => {
  return new window.google.maps.InfoWindow({
      content: markerInfo,
      maxWidth: 200
    })
  }

  render() {
    return (
      <div
      	ref={this.googleMapRef}
        id="google-map"
        ref={this.googleMapRef}
        style={{height: '320px' }}
      />
    )
  }
}