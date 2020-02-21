class MoodyApp extends React.Component{
  constructor() {
    super();

    this.state = { currentPage: 0, pages: [<HomePage />, <AboutPage />, <SignUp />] }
  }
  render() {
    return (
        <div>
          <Header />
          <div>
            <button onClick={() => this.setState({currentPage: 0})}> Homepage </button>
            <button onClick={() => this.setState({currentPage: 1})}> About </button>
            <button onClick={() => this.setState({currentPage: 2})}> SignUp </button>
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
                  password_confirmation: "",
                  registrationErrors: ""}
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
    // $.post("/reactsignup", {
    //   user: {
    //     email: this.state.email
    //     password: this.state.password
    //     password_confirmation: this.state.password_confirmation
    //   }
    // },
    // { withCredentials: true}
    // ).then(response => {
    //   console.log("registration response", response)
    // }).catch(error => {
    //   console.log("registration error", error)
    // })
    event.preventDefault()
      }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange} required />
        <input type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} required />
        <input type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange} required />
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
        this.handleSubmit = this.handleSubmit.bind(this)
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

  // handleSubmit(event) {
  //   event.preventDefault()
  //   $.post("/watchlistreact", {
  //     }
  //   }
  //   ).then(response => {
  //     console.log("movies added to watch list", response)
  //   }).catch(error => {
  //     console.log("movies watch list error", error)
  //   })

  // }



  render() {
    const movieTitleComponents = this.state.allmovies.map(item => <MovieTitle key={item.movie_id} movie={item} />)
    const movieDetailComponents = this.state.allmovies.map(item => <MovieDetails key={item.movie_id} movie={item} />)
        return(
            <div>
                <h3> Movies from {this.props.country}:</h3>
                <div className="movies">
                <form className="movies" >
                Add movies would you like to watch:
                <br />
                {movieTitleComponents}
                <br />
                <button type="submit">Add to watch list</button> 
                </form>
                </div>
            </div>
            )
    }
}

// set state of a false boolean and in 
// render function put movie details and only render if 
// the that state is true. and have on click set that state to true so it shows up.

// to add to my watchlist i need to set a state when "onchange"/"on checked". and then on submit i send over everything in the state. 

function MovieTitle(props){
    return(
      <div className="movie-link">
        <input type="checkbox"
                name="movie_keys"
                value={props.movie.movie_title}
                />
        <label>
          <a href="/" target="_blank">{props.movie.movie_title}</a>
          </label>
          <br />
      </div>
        )
      }

function MovieDetails(props){
    return(
      <div className="moviedetails">
        <li>Rating: {props.movie.imdb_rating}</li>
        <li>Votes: {props.movie.votes}</li>
        <li>Country Code: {props.movie.country_code}</li>
        </div>
        )
      }


ReactDOM.render(<MoodyApp />, document.getElementById('root'));