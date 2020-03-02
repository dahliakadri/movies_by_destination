class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
    	this.moodyMap = this.createGoogleMap()
    	this.EgyptMarker = this.createMarker()
      this.EgyptInfo = this.createInfoWindow()
      this.EgyptMarker.addListener('click', () => {
        this.EgyptInfo.open(this.moodyMap, this.EgyptMarker)
      })
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

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 26.8206, lng: 30.8025 },
      map: this.moodyMap,
      icon: {
        url: '/static/img/movie_icon_two.png',
        scaledSize: {
          width: 30,
          height: 30
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
