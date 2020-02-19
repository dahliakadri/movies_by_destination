class App extends React.Component {
  constructor() {
    super()
    this.state = {allcountries: [],
                  loading: false,
                  destination: "None"}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({loading : true})
    fetch("/countries.json")
            .then(response => response.json())
            .then(response => {
                const {countries} = response
                console.log(countries)
                this.setState({ loading: false,
                                allcountries: countries})
            })
  }

  handleSubmit(event) {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
      }

  render() {
    const text = this.state.loading ? "Moody Movies Loading..." : "Welcome to Moody Movies"
    const countryOptions = this.state.allcountries.map((item) =>
        <option key={item.country_code} value={item.country_name}>{item.country_name}</option>)
    return (
      <div>
        {text}
        <br></br>
        <br></br>
        Choose your destination:
         <form className="country-form" onSubmit={this.handleSubmit}>
          <select value={this.state.selectcountry}
                  name="destination"
                  onChange={this.handleChange}>
                  <option value="">-- Please Choose a destination --</option>
                  {countryOptions}
                  </select>
                  <button>Search</button>
        </form>
        {this.state.destination}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));