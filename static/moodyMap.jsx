class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {allCountries: []}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD-yWUDbXdh4dLAdjQRSEAWJuSNZwODEyI&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
    	this.moodyMap = this.createGoogleMap()
      fetch("/countries_with_movies")
            .then(response => response.json())
            .then(response => {
              const {countries} = response
              this.setState({ allCountries: countries})
              this.state.allCountries.map((item) =>
                this.createMarker(parseFloat(item.country_lat), parseFloat(item.country_lon)))
            })
      //fetch movies from each country and feed in the top 3 movies from each country 
      // this.state.allCountries.map((item) =>
      //           this.createInfoWindow(parseFloat(item.country_lat), parseFloat(item.country_lon)))
      //       })
      // this.EgyptInfo = this.createInfoWindow()
      // this.EgyptMarker.addListener('click', () => {
      //   this.EgyptInfo.open(this.moodyMap, this.EgyptMarker)
      // })
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 3,
      center: {
        lat: 26.8206,
        lng: 30.8025,
      },
      disableDefaultUI: true,
    })

   createMarker = (itemLat, itemLon) =>
    new window.google.maps.Marker({
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

    createInfoWindow = () =>
    new window.google.maps.InfoWindow({
      content: '<h1> Egypt</h1>'
    })

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
