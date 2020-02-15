// function MoodyApp () {
// 	return (
// 		<div>
// 			<Header />
// 			<MainContent />
// 			<Footer />
// 		</div>)
// }

class MoodyApp extends React.Component {
	render() {
		return (
			<div>
				<h1>Testing</h1>
				<Header username="vschool"/>
				<MainContent />
				<Footer />
			</div>)
	}
}

class Header extends React.Component{
	render() {
		const headertest = "test123 header"
	return(
		<div><h1>Welcome {this.props.username}, to Moody! This is a test {headertest}</h1>
		<h2>Movies by Travel Destinations</h2>
		<p1 class ="description">Find the perfect movie from your next travel desitination.</p1>
		<br></br>
		<p2 class="prompt">Start by choosing your destination country in the dropdown menu below:</p2></div>)
	}
}

class MainContent extends React.Component{
	render() {
		const maintest = "test 123 main"
		return(
			<h3> This is a test: {maintest}.</h3>)
	}
}

class Footer extends React.Component{
	render(){
		const footertest = "test123 footer"
		return (
			<p3>Moody Since 2020 another test: {footertest}</p3>)
	}
}

ReactDOM.render(<MoodyApp />, document.getElementById("root"))