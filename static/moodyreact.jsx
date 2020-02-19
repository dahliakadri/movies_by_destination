class MoodyApp extends React.Component{
    render() {
        return (
            <div>
                <Header />
                <MainContent />
                <Footer />
            </div>)
    }
}

class Header extends React.Component{
    constructor(){
        super()
        this.state = {userId : false,
                        userFname: false}

    }

    componentDidMount() {
        fetch("/reactlogincheck.json")
            .then(response => response.json())
            .then(response => {
                this.setState({userId: response.user_id, userFname: response.user_fname})
            })
    }

  render() {
        const logInNote = this.state.userId ? this.state.userFname + ", you're logged into Moody!": "You're not logged into Moody."
    return(
        <div>
            <h1 className="title">Moody Movies by Travel Destinations</h1>
            <h2 className="slogan">Find the perfect movie from your next travel desitination.</h2>
            <h3 className="login-header-message">{logInNote}</h3>
        </div>)
    }
}



class Footer extends React.Component{
    render(){
        return (
            <div>Moody Since 2020</div>)
    }
}


class MainContent extends React.Component {
    render() {
        return (
            <div>
                <CountrySearch />
            </div>)
    }
}

class CountrySearch extends React.Component {
  constructor() {
    super()
    this.state = {allcountries: [],
                  loading: false,
                  destination: false,
                  submitcountry: false}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({loading : true})
    fetch("/countries.json")
            .then(response => response.json())
            .then(response => {
                const {countries} = response
                this.setState({ loading: false,
                                allcountries: countries})
            })
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({ [name]: value})

  }

  handleSubmit(event) {
        event.preventDefault()
        this.setState({ submitcountry : this.state.destination })
      }

  render() {
    const text = this.state.loading ? "Moody Movies Loading..." : "Welcome to Moody Movies"
    const countryOptions = this.state.allcountries.map((item) =>
        <option key={item.country_code} value={item.country_name}>{item.country_name}</option>)
    const movies = this.state.submitcountry ? <MoviesByCountry country={this.state.submitcountry} /> : <p> Pick a Movie</p>
    return (
      <div>
        {text}
        <br />
        <br />
        Choose your destination:
         <form className="country-form" onSubmit={this.handleSubmit}>
          <select value={this.state.destination}
                  name="destination"
                  onChange={this.handleChange}>
                  <option value="">-- Please Choose a destination --</option>
                  {countryOptions}
                  </select>
                  <button>Search</button>
        </form>
        { movies }
      </div>
    );
  }
}

class MoviesByCountry extends React.Component{
    constructor() {
        super()
        this.state = {allmovies: []}
  }

  componentDidMount() {
    console.log(this.props.country)
    fetch(`/reactmoviesbycountry/${this.props.country}.json`)
            .then(response => response.json())
            .then(response => {
                const {movies} = response
                console.log(movies)
                this.setState({ allmovies: movies})
                })

  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.country !== this.props.country){
      fetch(`/reactmoviesbycountry/${this.props.country}.json`)
            .then(response => response.json())
            .then(response => {
                const {movies} = response
                console.log(movies)
                this.setState({ allmovies: movies})
                })
      }
  }

  render() {
    const movieComponents = this.state.allmovies.map(item => <Movie key={item.movie_id} movie={item} />)
        return(
            <div>
                <h3> This is MoviesByCountry component country: {this.props.country}.</h3>

                <div className="movies">
                {movieComponents}
                </div>
            </div>
            )
    }
}

function Movie(props) {
        return(
            <div className="movie">
                <h2>Title: {props.movie.movie_title}</h2>
                <p>Rating: {props.movie.imdb_rating}</p>
                <p>Votes: {props.movie.votes}</p>
                <p>Country Code: {props.movie.country_code}</p>
            </div>)
}


ReactDOM.render(<MoodyApp />, document.getElementById('root'));