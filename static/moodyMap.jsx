class GoogleMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {allCountries: []}
		this.googleMapRef = React.createRef()
	}

  componentDidMount() {
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCf81HOB1Z-64TW7Bc5nraUqgbcLoLJBHQ&libraries=places`
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
                const infoWindow = this.createInfoWindow(markerInfo)
                const markerInfo = '<h1>Test</h1>'
                marker.addListener('click', () => {
                  $.get("/movies", {country: country.country_name})
                  .then(response => {
                    const {movies} = response
                    const markerInfo = `
                            <h2>Top Movie from ${country.country_name}</h2>
                            <h3>${movies[1].movie_title}</h3>
                              <li>Rating: ${movies[1].imdb_rating}</li>
                              <li>Votes: ${movies[1].votes}</li>
                              <img alt="Poster" src=${movies[1].movie_poster} title="test"/>`
                    const infoWindow = this.createInfoWindow(markerInfo)
                    infoWindow.open(this.moodyMap, marker)
                  })
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

      // TODO: Need to somehow make a variable for each of the markers so I can add an event listener to them. "item.marker =" does not work..
      // fetch movies from each country and feed in the top 3 movies from each country
      // where should I fetch the movie data for each country here?
      // this.state.allCountries.map((item) =>
      //   need to fetch movies based on the item
      //   this.item.Info = this.createInfoWindow(pass in the movies)
      //   this.item.marker.addListener('click', () => {
      //                 this.item.Info.open(this.moodyMap, this.itemMarker)
      // }))
                 
      //       })
 
 // $.get("/movies", {country: item.country_name})
 //      .then(response => {
 //        const {movies} = response
 //      //test stuff ignore
      // this.EgyptInfo = this.createInfoWindow()
      // this.EgyptMarker.addListener('click', () => {
      //   this.EgyptInfo.open(this.moodyMap, this.EgyptMarker)
      // })

 // testCreateInfoWindow (country, item.movie_title, item.movie_poster, item.imbd_rating, item.votes, item.movie_title) =>
 //    new window.google.maps.InfoWindow({
 //      content: <h1> 'country' </h1>
 //    })

  // testCreateInfoWindow (country, item.movie_title, item.movie_poster, item.imbd_rating, item.votes, item.movie_title) =>
  //   new window.google.maps.InfoWindow({
  //     content: <h1> 'country' </h1>
  //   })
