class MoodyApp extends React.Component{
  constructor() {
    super();

    this.state = { currentPage: 0, pages: [<HomePage />, <AboutPage />, <SignUp />, <Watchlist />] }
  }
  render() {
    return (
        <div>
          <Header />
          <div>
            <button onClick={() => this.setState({currentPage: 0})}> Homepage </button>
            <button onClick={() => this.setState({currentPage: 1})}> About </button>
            <button onClick={() => this.setState({currentPage: 2})}> SignUp </button>
            <button onClick={() => this.setState({currentPage: 3})}> Watchlist </button>
          </div>
          <div>
          {this.state.pages[this.state.currentPage]}
          </div>
          <br/>
          <Footer />
        </div>
            )
  }
}

class Header extends React.Component{

    render() {
        return(
        <div>
            <h2 className="title">Moody Movies by Travel Destinations</h2>
            <h4 className="slogan">Find the perfect movie from your next travel desitination | Logo </h4>
        </div>)
    }
}



class Footer extends React.Component{
    render(){
        return (
            <div>Moody Since 2020</div>)
    }
}

class AboutPage extends React.Component { 
  render(){
        return (
            <div>Moody Movies by Destination lets you search, save,
            and share movies from your favorite travel destination</div>)
    }

}

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <UserSession />
                <CountrySearch />
            </div>)
    }
}


class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {email: "",
                  password: "",
                  first_name:"",
                  last_name:"",
                  country:"",
                  registrationErrors: "",
                  allcountries: []}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log("handle change", event)

  }

  handleSubmit(event) {
    const userInfo = {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        country: this.state.country,
      }
    fetch("/reactsignup", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo) // body data type must match "Content-Type" header
    })
    .then(response => {
      console.log("registration response", response)
    }).catch(error => {
      console.log("registration error", error)
    })
    console.log("form submitted")
    event.preventDefault()
  }

  componentDidMount() {
    fetch("/countriesreg.json")
            .then(response => response.json())
            .then(response => {
                const {countries} = response
                this.setState({ allcountries: countries})
            })
  }

  render() {
    const countryOptions = this.state.allcountries.map((item) => <option key={item.country_code} value={item.country_name}>{item.country_name}</option>)
    return (

      <div>
        <br />
        Registration
        <br />
        <form onSubmit={this.handleSubmit}>
        <input type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange} required />
                <label>Email</label>
                <br />
        <input type="text"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange} required />
                <label>First Name</label>
                <br />
        <input type="text"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange} required />
                <label>Last Name</label>
                <br />
        <select value={this.state.country}
                name="country"
                onChange={this.handleChange}>
              <option value="">-- Please Choose Country --</option>
              {countryOptions}
          </select>
          <label>Which country do you most connect with?</label>
          <br />
          <input type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} required />
                <label>Password</label>
                <br />
          <button type="submit">Regiser</button>
        </form>
      </div>
      )
  }
}

class UserSession extends React.Component {
  constructor(){
        super()
        this.state = {userId : false,
                        userFname: false}
      // this.login = this.login.bind(this)
      // this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        fetch("/reactlogincheck.json")
            .then(response => response.json())
            .then(response => {
                this.setState({userId: response.user_id, userFname: response.user_fname})
            })
    }

    // login () {

    // }

    // logout () {

    // }

    render() {
        const logInNote = this.state.userId ? <div><button className="logout" onClick={this.logout}>Log out</button>{this.state.userFname}, you're logged into Moody!</div>
        : <div>You're not logged into Moody yet! <button className="login" onClick={this.login}>Log In</button> or <button className="signup">Sign Up</button></div>
        return (
            <div>
                <h3 className="login-header-message">{logInNote}</h3>
{/*                <UserLogIn />
                <UserLogOut />*/}
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
    const text = this.state.loading ? "Searching Countries with Movies..." : "Movies Loaded. Welcome to Moody Movies"
    
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
        this.state = {allmovies: [], checkedMovies: {}}

        this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(props) {
    $.get("/movies", {country: this.props.country})
      .then(response => {
        const {movies} = response
        this.setState({ allmovies: movies})
        })

  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.country !== this.props.country){
      $.get("/movies", {country: this.props.country})
            .then(response => {
                const {movies} = response
                this.setState({ allmovies: movies})
                })
      }
  }

  handleSubmit(event) {
    event.preventDefault()
    const watchListMovies = Object.keys(this.state.checkedMovies)
    const watchDictMovies = {"movieIds": watchListMovies}
    const response = fetch('/watchlistreact', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(watchDictMovies) // body data type must match "Content-Type" header
    })
    // return await response.json(); // parses JSON response into native JavaScript objects
    }
  

  render() {
    const movieComponents = this.state.allmovies.map(item => 
      <Movie 
        key={item.movie_id}
        movie={item} 
        country={this.props.country} 
        checkedMovies = { this.state.checkedMovies }
        onSelected={(() => {
          let new_movs = Object.assign({}, this.state.checkedMovies)
          new_movs[item.movie_id] = item.movie_id
          this.setState({checkedMovies: new_movs})
        })} 
        onUnselected={(() =>{
          let new_movs = Object.assign({}, this.state.checkedMovies)
          delete new_movs[item.movie_id]
          this.setState({checkedMovies: new_movs})

        }
          )}
      />
    )
        return(
            <div>
                <h3> Movies from {this.props.country}:</h3>
                <div className="movies">
                <form className="movies" onSubmit={this.handleSubmit}>
                Add movies would you like to watch:
                <br />
                {movieComponents}
                <br />
                <button type="submit">Add to watch list</button> 
                </form>
                </div>
            </div>
            )
    }
}

class Movie extends React.Component{
  constructor() {
    super()
    this.state = {moviedetails: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({moviedetails: !this.state.moviedetails})
  }
  render(){
    const movieDetails = this.state.moviedetails ?
      <div className="moviedetails">
        <li>Rating: {this.props.movie.imdb_rating}</li>
        <li>Votes: {this.props.movie.votes}</li>
        <li>Country: {this.props.country}</li>
        <br />
        </div> : <br />
    return(
      <div>
      <div className="movie-link">
        <input type="checkbox"
                name="movie_keys"
                checked={!!this.props.checkedMovies[this.props.movie.movie_id]}
                value={this.props.movie.movie_id}
                onChange={ (event) => !event.target.checked ? this.props.onUnselected() : this.props.onSelected() }
        />
        <label>
          <a onClick={this.handleClick} target="_blank">{this.props.movie.movie_title}</a>
          </label>
          <br />
      </div>
      {movieDetails}
      </div>
        )
      }
  }


class Watchlist extends React.Component{
  constructor() {
    super()
    this.state = {watchmovies: [], checkedMovies: {}, remove: true}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const watchUpdateMovies = Object.keys(this.state.checkedMovies)
    const watchUpdatetObject = {"movieIds": watchUpdateMovies}
    const response = fetch('/watchlist/update', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(watchUpdateMovies) // body data type must match "Content-Type" header
    })
    // return await response.json(); // parses JSON response into native JavaScript objects
    this.setState ({remove: false})
    }

  componentDidMount(props) {
    $.get("/watchlist/user", {userId:1})
      .then(response => {
        const {movies} = response
        console.log(movies)
        this.setState({ watchmovies: movies})
        })

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.remove == false){
      $.get("/watchlist/user", {userId: 1})
            .then(response => {
                const {movies} = response
                console.log(movies)
                this.setState({ watchmovies: movies})
                })
      this.setState({remove: true})
      }
  }

  render() {
    const movieWatchComponents = this.state.watchmovies.map(item => 
      <Movie 
        key={item.movie_id}
        movie={item} 
        country={item.country_name} 
        checkedMovies = { this.state.checkedMovies }
        onSelected={(() => {
          let new_movs = Object.assign({}, this.state.checkedMovies)
          new_movs[item.movie_id] = item.movie_id
          this.setState({checkedMovies: new_movs})
        })} 
        onUnselected={(() =>{
          let new_movs = Object.assign({}, this.state.checkedMovies)
          delete new_movs[item.movie_id]
          this.setState({checkedMovies: new_movs})
        })}
      />)
      return (
        <div>
          <h3> Your movies watch list:</h3>
          <div className="movies">
          <form className="movies" onSubmit={this.handleSubmit}>
            Check to remove movies from your list:
            <br />
            {movieWatchComponents}
            <br />
            <button type="submit">Remove from watch list</button> 
          </form>
          </div>
        </div>
        )
  }
}

ReactDOM.render(<MoodyApp />, document.getElementById('root'));