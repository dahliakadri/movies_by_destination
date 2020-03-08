//TODO: Add react router instead of "pages in state"
class MoodyApp extends React.Component{
  constructor(props) {
    super(props)
    this.state = { currentPage: 0,
                    loginStatus: false,
                    userId: null,
                    userFname: null,
                    userEmail: null,
                    pages : [<HomePage />,
                            <AboutPage />,
                            <Watchlist  />,
                            <SignUp moodyAppCallback = {this.myCallbackSignUp} />,
                            <SignIn moodyAppCallback = {this.myCallbackSignIn} />,
                            <MoviesbyMap />,
                            <ContactUs />,
                             <MyProfile />,
                            ]
                  }
    this.myCallbackSignUp = this.myCallbackSignUp.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.myCallbackSignIn = this.myCallbackSignIn.bind(this)
  }

  myCallbackSignUp = (dataFromSignUp) => {
        this.setState({ loginStatus: dataFromSignUp.loginstatus})
        if (dataFromSignUp.loginstatus== false){
          alert("User email already exists. Sign in or sign up with a new email.")
          this.setState({currentPage: 0})
        }
        else{
          this.setState({ userId: dataFromSignUp.sessioninfo[0].user_id,
                        userFname: dataFromSignUp.sessioninfo[0].current_user,
                        userEmail: dataFromSignUp.sessioninfo[0].user_email,
                        currentPage: 0 })
        }
  }

  handleLogout(){
    fetch("/reactlogout")
    .then(response => { 
      return response.json()
    })
    .then((data) => {
    this.setState({currentPage: 0,
                  loginStatus: data.loginstatus})
  })
  }

  myCallbackSignIn = (dataFromSignIn) => {
        this.setState({ loginStatus: dataFromSignIn.loginstatus})
        if (dataFromSignIn.loginstatus == false){
          alert("User email or password incorrect, try again or sign up.")
          this.setState({currentPage: 0})
        }
        else{
          this.setState({ userId: dataFromSignIn.sessioninfo[0].user_id,
                        userFname: dataFromSignIn.sessioninfo[0].current_user,
                        userEmail: dataFromSignIn.sessioninfo[0].user_email,
                        currentPage: 0 })
        }
  }

  render() {
    const logbuttons = this.state.loginStatus ? <button  className="btn btn-sm btn-outline-secondary" type="button" onClick={this.handleLogout}> Logout </button> : <div><button  className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 3})}> Sign Up </button>
    <button  className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 4})}> Sign In </button></div>
    const userStatus = this.state.loginStatus ? <div>Welcome, {this.state.userFname}, logged in with {this.state.userEmail}.</div> : <div>Not logged in</div>
    const userButtons = this.state.loginStatus ? <div><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 2})}> My Movies List </button><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 7})}> My Profile</button></div>: <div></div>
    return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="">
            <img src="/static/img/travelimage.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
            Moody</a>
            <form className="form-inline">
              <button className="btn btn-sm btn-outline-success" type="button" onClick={() => this.setState({currentPage: 0})}>Home</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 5})}>Movies by Map</button>
              { userButtons }
              { logbuttons }
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 1})}>About</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 6})}>Contact Us</button>
            </form>
          </nav>
          <div>
          { userStatus }
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

class Footer extends React.Component{
    render(){
        return (
            <div>Moody: Top Movies by Country Est.2020</div>)
    }
}

//TODO: Link my github/linkedin/photo
class AboutPage extends React.Component { 
  render(){
        return (
            <div>Moody Movies by Destination lets you search, save,
            and share movies from your favorite travel destination.
            <p>Moody was created by Dahlia Kadri, a current Software Engineering
            Student at Hackbright Academy in San Franscico, California.</p></div>)
    }

}

class ContactUs extends React.Component { 
  render(){
        return (
            <div>Contact Us.
            <p>Contact Us Here</p></div>)
    }

}

class MyProfile extends React.Component { 
  render(){
        return (
            <div>User Profile.
            <p>User Profile</p></div>)
    }

}

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loginStatus: this.props.loginStatus,
                  userId : this.props.userId,
                  userFname: this.props.userFname,
                  userEmail: this.props.userEmail}
  }
    render() {
        return (
            <div>
            {this.state.userId}
                <CountrySearch loginStatus={this.state.loginStatus}
                                userId={this.state.userId} 
                                userFname={this.state.userFname}
                                userEmail={this.state.userEmail}/>
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
    .then(response => { return response.json()
    }).then((data) => {
      this.props.moodyAppCallback(data) })
    event.preventDefault()
  }

  componentDidMount() {
    fetch("/countries")
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

class SignIn extends React.Component{
  constructor(props) {
    super(props)
    this.state = {email: "",
                  password: ""}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })

  }

  handleSubmit(event) {
    const userInfo = {
        email: this.state.email,
        password: this.state.password,
      }
    fetch("/reactlogin", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo) // body data type must match "Content-Type" header
    })
    .then(response => { return response.json()
    }).then((data) => {
      this.props.moodyAppCallback(data) })
    event.preventDefault()
  }


  render() {
    return (
      <div>
        <br />
        Sign In
        <br />
        <form onSubmit={this.handleSubmit}>
        <input type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange} required />
                <label>Email</label>
                <br />
          <input type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} required />
                <label>Password</label>
                <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
      )
  }
}

class CountrySearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {allcountries: [],
                  loading: false,
                  destination: false,
                  submitcountry: false}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({loading : true})
    this.mounted = true
    fetch("/countries_with_movies")
            .then(response => response.json())
            .then(response => {
              if(this.mounted){
                const {countries} = response
                this.setState({ loading: false,
                                allcountries: countries})
                }
            })
  }

componentWillUnmount(){
  this.mounted = false
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
    const countryLoadStatus = this.state.loading ? "Loading Destinations..." : "Destinations Loaded. Find your movies"
    const countryOptions = this.state.allcountries.map((item) =>
        <option key={item.country_code} value={item.country_name}>{item.country_name}</option>)
    
    const movies = this.state.submitcountry ? <MoviesByCountry country={this.state.submitcountry}/> : <p>Pick a Destination Above</p>

    return (
      <div>
        {countryLoadStatus}
        {this.state.userId}
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

//Renders movies by country and handles the user addition of movies to their watchlist
//TODO: After movies added, render the watchlist
//TODO: pass in if a user is logged in, if they are logged in show add to watch list button if not then don't show
class MoviesByCountry extends React.Component{
    constructor(props) {
        super(props)
        this.state = {allmovies: [],
                      checkedMovies: {}}

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
      .then(response => { return response.json()
      }).then((data) => {
      alert(data.movie_status)})
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
            {this.state.userId}
                <h3> Movies from {this.props.country}:</h3>
                <div className="movies">
                <form className="movies" onSubmit={this.handleSubmit}>
                Check movies you like to add to your list:
                <br />
                {movieComponents}
                <br />
                <button type="submit">Add to my movie list</button> 
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
         <img alt="Poster" src={this.props.movie.movie_poster} title="test"/>
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

//Renders the users watchlist and allows them to remove movies
//TODO: Allow users to have a "watched option" that will simply grey out the movie and rate it
//and move the movie from the watch list to their "watched" list
class Watchlist extends React.Component{
  constructor(props) {
    super(props)
    this.state = {watchmovies: [],
                  checkedMovies: {},
                  remove: true}
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
    .then(response => { return response.json()
    }).then((data) => {
      this.setState ({remove: data.remove_status,
                      checkedMovies: {}})
    })
    }

  componentDidMount(props) {
    $.get("/watchlist/user", {test: "test"})
      .then(response => {
        const {movies} = response
        this.setState({ watchmovies: movies})
        })

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.remove == false){
      $.get("/watchlist/user", {test: "test"})
            .then(response => {
                const {movies} = response
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
            Check to remove movies from your list and submit at the bottom:
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

//TODO: Need to have my map mass back into the country that is clicked. Set the state to country clicked
class MoviesbyMap extends React.Component{
  constructor(props) {
    super(props)
    this.state = {country: null}
    this.myCallbackMap = this.myCallbackMap.bind(this)

  }
  myCallbackMap = (dataFromMap) => {
        this.setState({ country: dataFromMap.country})
  }

  render(){
    let movieForm = <div>Place Holder</div>
    if (this.state.country === null){
      movieForm = <div>Select Country On Map{this.state.country}</div>
    }
    else{movieForm =<MoviesByCountry country={this.state.country}/>}
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <GoogleMap moodyMapCallback = {this.myCallbackMap}/>
          </div>
          <div className="col-12 col-md-6">
            { movieForm }
            </div>
        </div>
      </div> )
  }

}

ReactDOM.render(<MoodyApp />, document.getElementById('root'))