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
                    const markerInfo = `<h4>Movies from ${country.country_name}</h4>`
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
      center: {
        lat: 26.8206,
        lng: 30.8025,
      },
      disableDefaultUI: true,
    })

  createMarker = (itemLat, itemLon) => {
    return new window.google.maps.Marker({
      position: { lat: itemLat, lng: itemLon },
      map: this.moodyMap,
      icon: {
        url: '/static/img/movie_icon_two.png',
        scaledSize: {
          width: 20,
          height: 20
        }
      }
    })
  }

  createInfoWindow = (markerInfo) => {
  return new window.google.maps.InfoWindow({
      content: markerInfo
    })
  }

  render() {
    return (
      <div
      	ref={this.googleMapRef}
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '400px', height: '300px' }}
      />
    )
  }
}