class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {allCountries: []}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`
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
      zoom: 4,
      zoomControl: true,
      scaleControl: false,
      center: {
        lat: 26.8206,
        lng: 30.8025,
      },
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
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