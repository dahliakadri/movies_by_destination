// function MoodyApp () {
// 	return (
// 		<div>
// 			<Header />
// 			<MainContent />
// 			<Footer />
// 		</div>)
// }

class MoodyApp extends React.Component {
	constructor(){
		super()
		this.state = {
			answer: "No"
		}
	}
	render() {
		return (
			<div>
				<h1>Is state important to know? {this.state.answer}</h1>
				<Header username="vschool"/>
				<MainContent answer={this.state.answer}/>
				<Footer />
			</div>)
	}
}

class Header extends React.Component{
	render() {
		const headertest = "test123 header"
	return(
		<div><h1 className="welcomemessage">Welcome {this.props.username}, to Moody! This is a test {headertest}</h1>
		<h2 className="slogan">Movies by Travel Destinations</h2>
		Find the perfect movie from your next travel desitination.
		<br></br>
		Start by choosing your destination country in the dropdown menu below:</div>)
	}
}

class MainContent extends React.Component{
	render() {
		const maintest = "test 123 main"
		return(
			<h3> This is a test: {maintest} and {this.props.answer}.</h3>)
	}
}

class Footer extends React.Component{
	render(){
		const footertest = "test123 footer"
		return (
			<div>Moody Since 2020 another test: {footertest}</div>)
	}
}

ReactDOM.render(<MoodyApp />, document.getElementById("root"))