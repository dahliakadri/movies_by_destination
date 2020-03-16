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

  componentDidMount() {
    fetch("/loginstatus")
            .then(response => response.json())
            .then(response => {
              if (response.loginstatus == true){
                this.setState({ loginStatus: response.loginstatus,
                                userId: response.sessioninfo[0].user_id,
                                userFname: response.sessioninfo[0].current_user,
                                userEmail: response.sessioninfo[0].user_email,})
            }
            })
  }

  render() {
    const logbuttons = this.state.loginStatus ? <button  className="btn btn-sm btn-outline-secondary" type="button" onClick={this.handleLogout}> Logout </button> : <div><button  className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 3})}> Sign Up </button>
    <button  className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 4})}> Sign In </button></div>
    const userStatus = this.state.loginStatus ? <div className="row loginstatus"><div className="col-6 offset-6"><div>Welcome, {this.state.userFname}, logged in with {this.state.userEmail}. </div></div></div> : <div className="row loginstatus"> <div className="col-6 offset-6"> <div>Login Status: Not logged in</div></div></div>
    const userButtons = this.state.loginStatus ? <div><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 2})}> My Movies List </button><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 7})}> My Profile</button></div>: <div></div>
    return (
        <div className="pos-f-t">
          <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
              <form className="form-inline justify-content-end">
              <button className="btn btn-sm btn-outline-success" type="button" onClick={() => this.setState({currentPage: 0})}>Home</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 5})}>Movies by Map</button>
              { userButtons }
              { logbuttons }
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 1})}>About</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => this.setState({currentPage: 6})}>Contact Us</button>
            </form>
            </div></div>
          <nav className="navbar sticky-top no-gutters navbar-light bg-light">
            <a className="navbar-brand" href="">
            <img src="/static/img/travelimage.png" width="60" height="50" className="d-inline-block align-middle" alt=""/>      Moody Movies by Destination</a>
            <button className="navbar-toggler navbar navbar-dark btn-toggle" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon navbar-dark"></span>
            </button>
          </nav>
          <div>
          { userStatus }
          </div>
          <div>
          {this.state.pages[this.state.currentPage]}
          </div>
        </div>
            )
  }
}

//TODO: Link my github/linkedin/photo
class AboutPage extends React.Component { 
  render(){
        return (
          <div className="card mb-3">
           <div className="row no-gutters justify-content-center">
            <div className="col-md-4">
                <img src="/static/img/movie_icon_three.png" className="card-img" alt="Poster"/>
            </div>
             <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Moody Movies - Movies by Destination</h5>
                <p className="card-text">Users can search, save, and watch top movies by country.</p>
                <p className="card-text"><small className="text-muted">Last updated March 18, 2020</small></p>
              </div>
            </div>
           </div>
          </div>)
    }

}

class ContactUs extends React.Component { 
  render(){
        return (
          <div className="card mb-3">
           <div className="row no-gutters justify-content-center">
            <div className="col-md-4">
                <img src="/static/img/movie_icon_three.png" className="card-img" alt="Poster"/>
            </div>
             <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Contact Us</h5>
                <p className="card-text">Please reach out to dahliakadri@gmail.com</p>
                <p className="card-text"><small className="text-muted">Last updated March 18, 2020</small></p>
              </div>
            </div>
           </div>
          </div>)
    }

}

class MyProfile extends React.Component {

constructor(props) {
    super(props)
    this.state = { loginStatus: false,
                    userId: null,
                    userFname: null,
                    userEmail: null,
                    userTimeStamp: null
                  }
}

componentDidMount() {
    fetch("/loginstatus")
            .then(response => response.json())
            .then(response => {
              if (response.loginstatus == true){
                this.setState({ loginStatus: response.loginstatus,
                                userId: response.sessioninfo[0].user_id,
                                userFname: response.sessioninfo[0].current_user,
                                userEmail: response.sessioninfo[0].user_email,
                                userTimeStamp: response.sessioninfo[0].user_created})
            }
            })
  }

  render(){
        return (
             <div className="card mb-3">
           <div className="row no-gutters justify-content-center">
            <div className="col-md-4">
                <img src="/static/img/movie_icon_three.png" className="card-img" alt="Poster"/>
            </div>
             <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">My Profile</h5>
                <p className="card-text">Name: {this.state.userFname}</p>
                <p className="card-text">My Email: {this.state.userEmail}</p>
                <p className="card-text">Account Created: {this.state.userTimeStamp}</p>
                <p className="card-text"><small className="text-muted">Last updated March 18, 2020</small></p>
              </div>
            </div>
           </div>
          </div>)
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
                  <div className="container-fluid">
                <Carousel />
                <CountrySearch loginStatus={this.state.loginStatus}
                                userId={this.state.userId} 
                                userFname={this.state.userFname}
                                userEmail={this.state.userEmail}/>
            </div>)
    }
}

class Carousel extends React.Component{
  constructor(props){
    super(props)
    this.state = {allmovies: []}
  }

  componentDidMount(){
     $.get("/moviescarousel", {test: "test"})
      .then(response => {
        const {movies} = response
        this.setState({ allmovies: movies})
        }).then(response => {
          $('#recipeCarousel').carousel({
            interval: 2000})
          $('.carousel .carousel-item').each(function(){
            let minPerSlide = 3
            let next = $(this).next()
            if (!next.length) {
              next = $(this).siblings(':first')}
            next.children(':first-child').clone().appendTo($(this))
            for (let i=0; i < minPerSlide ; i++) {
              next = next.next()
              if (!next.length) {
                next = $(this).siblings(':first')}
                next.children(':first-child').clone().appendTo($(this))}
              })
        })
  }

  render(){
    let poster1 = "http://placehold.it/380?text=1"
    let poster2 = "http://placehold.it/380?text=2"
    let poster3 = "http://placehold.it/380?text=3"
    let poster4 = "http://placehold.it/380?text=4"
    let poster5 = "http://placehold.it/380?text=5"
    let poster6 = "http://placehold.it/380?text=6"
    let poster7 = "http://placehold.it/380?text=7"
    let poster8 = "http://placehold.it/380?text=8"
    let poster9 = "http://placehold.it/380?text=9"
    let poster10 = "http://placehold.it/380?text=10"
    let poster11 = "http://placehold.it/380?text=11"
    let poster12 = "http://placehold.it/380?text=12"
    let poster13 = "http://placehold.it/380?text=13"
    let poster14 = "http://placehold.it/380?text=14"
    let poster15 = "http://placehold.it/380?text=15"
    
    const movie_list = this.state.allmovies

    if(movie_list.length > 14){
    poster1 = movie_list[0]["movie_poster"],
    poster2 = movie_list[1]["movie_poster"],
    poster3 = movie_list[2]["movie_poster"],
    poster4 = movie_list[3]["movie_poster"],
    poster5 = movie_list[4]["movie_poster"],
    poster6 = movie_list[5]["movie_poster"],
    poster7 = movie_list[6]["movie_poster"],
    poster8 = movie_list[7]["movie_poster"],
    poster9 = movie_list[8]["movie_poster"],
    poster10 = movie_list[9]["movie_poster"],
    poster11 = movie_list[10]["movie_poster"],
    poster12 = movie_list[11]["movie_poster"],
    poster13 = movie_list[12]["movie_poster"],
    poster14 = movie_list[13]["movie_poster"],
    poster15 = movie_list[14]["movie_poster"]
  }

    return(
      <div className="container text-center my-3">
        <div className="row mx-auto my-auto">
        <div id="recipeCarousel" className="carousel slide w-100" data-ride="carousel">
            <div className="carousel-inner w-100" role="listbox">
                <div className="carousel-item active">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster1}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster2}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster3}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster4}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster5}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster6}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster7}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster8}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster9}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster10}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster11}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster12}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster13}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster14}/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="col-6 col-md-3">
                        <div className="card card-body">
                            <img className="img-fluid" src={poster15}/>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev w-auto" href="#recipeCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next w-auto" href="#recipeCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
         </div>
      </div>
      )
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
      <div className="container">
        <form className="signup-or-in" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First Name</label>
                <input type="text"
                className="form-control"
                placeholder="First name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange} required />
                </div>
            <div className="form-group col-md-6">
              <label>Last Name</label>
              <input type="text"
                className="form-control"
                placeholder="Last Name"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange} required />
                </div>
            </div>
            <div className="form-row">
            <label>Which country do you most connect with?</label>
              <select value={this.state.country}
                name="country"
                onChange={this.handleChange}
                className="form-control">
              <option value="">-- Country--</option>
              {countryOptions}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange} required />
                </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} required />
                </div>
                </div>
          <button className="btn add-movie-btn btn-outline-success" type="submit">Register</button>
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
      <div className="container">
        <form className="signup-or-in" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange} required />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} required />
              </div>
              </div>
          <button className="btn add-movie-btn btn-outline-success" type="submit">Sign In</button>
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
    const countryLoadStatus = this.state.loading ? "Movies by Country Loading..." : "Movies by Country"
    const countryOptions = this.state.allcountries.map((item) =>
        <option key={item.country_code} value={item.country_name}>{item.country_name}</option>)
    
    const movies = this.state.destination ? <MoviesByCountry country={this.state.destination}/> : <p></p>

    return (
      <div>
        <div className="row justify-content-around"><div className="col-10 col-md-6 countryform">
        <br/>
        {countryLoadStatus}
         <form className="country-form" onSubmit={this.handleSubmit}>
          <select className="custom-select" value={this.state.destination}
                  name="destination"
                  onChange={this.handleChange}>
                  <option value="">-- Find more top movies by country --</option>
                  {countryOptions}
                  </select>
        </form><br/></div></div>
        <br/>
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
                <form className="movies-form" onSubmit={this.handleSubmit}>
                <div className="movies form-group row justify-content-center">
                {movieComponents}
                <br />
                </div>
                 <div className="form-group row justify-content-center">
                <button className = "btn add-movie-btn btn-outline-success" type="submit">Add to my movie list</button> 
                </div>
                </form>
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
      <ul className= "list-group moviedetails">
        <li className = "list-group-item list-group-item-secondary">Rating: {this.props.movie.imdb_rating}</li>
        <li className = "list-group-item list-group-item-secondary">Votes: {this.props.movie.votes}</li>
        <li className = "list-group-item list-group-item-secondary">{this.props.country}</li>
        </ul> : <h1></h1>
    return(
      <div className="movie-poster col-6 col-md-2">
        <label className="form-check-label">
          <img alt="Poster" onMouseEnter={this.handleClick} onMouseLeave={this.handleClick} target="_blank" src={this.props.movie.movie_poster} />
          <br />
          <div className="form-group row">
          <div className="movie-title col-10">
          {this.props.movie.movie_title}
          </div>
          <div className="col-2">
          <input type="checkbox" className="form-check-input"
                name="movie_keys"
                checked={!!this.props.checkedMovies[this.props.movie.movie_id]}
                value={this.props.movie.movie_id}
                onChange={ (event) => !event.target.checked ? this.props.onUnselected() : this.props.onSelected() }
        />
        </div>
        </div>
          </label>
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
          <form className="movies" onSubmit={this.handleSubmit}>
          <div className="watch-list-title map-country-selector row justify-content-center">
          <h3> Movie favorites</h3>
          </div>
          <div className="form-group row justify-content-center">
            {movieWatchComponents}
            </div>
            <div className="form-group row justify-content-center">
             <button className="btn add-movie-btn btn-outline-success" type="submit">Remove from favorites</button>
             </div>
             </form>
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
      movieForm = <div className="col-12 col-md-6 map-country-selector justify-content-center">Select a movie ticket icon on the map{this.state.country}</div>
    }
    else{movieForm =<MoviesByCountry country={this.state.country}/>}
    return(
        <div className="row justify-content-center">
          <div className="moody-map col-12 justify-content-center">
            <GoogleMap moodyMapCallback = {this.myCallbackMap} className="justify-content-center"/>
          </div>
          <div className="col-12">
          <div className="row justify-content-center">
            { movieForm }
            </div>
            </div>
        </div>)
  }

}

ReactDOM.render(<MoodyApp />, document.getElementById('root'))