class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleApiKey}&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
    	this.googleMap = this.createGoogleMap()
    	this.marker = this.createMarker()
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 1,
      center: {
        lat: 26.8206,
        lng: 30.8025,
      },
      disableDefaultUI: true,
    })

  // createMarker = () =>
  //   new window.google.maps.Marker({
  //     position: { lat: 43.642567, lng: -79.387054 },
  //     map: this.googleMap,
  //   })

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
