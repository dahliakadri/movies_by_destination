'use strict';

function MyNewApp () {
	return (
		<div>
			<Header />
			<MainContent />
			<Footer />
		</div>)
}

function Header() {
	const firstName = "Dahlia"
	const lastName = "Kadri"
	const date = new Date()
	const styles = {
		color: "#FF8C00",
		backgroundColor: "#FF2D00",
		fontSize: "35px"
	}
	return(
		<header className="navbar">
		<h1>Welcome to Moody, it is about {`${date.getHours()} o'clock`}- This is the header</h1>
		<h2 style={styles}>Goodnight</h2>
		</header>
	)
}

function MainContent() {
	return(
		<div className="todo-list">
			<ToDoItem />
			<ToDoItem />
			<ToDoItem />
		
		</div>
	)
}


function Footer() {
	return (
		<footer>
			<h3>Moody since 2020.</h3>
		</footer>
		)
}

function ToDoItem() {
	return (
			<div className="todo-item"><input type="checkbox" />
			<p>Place 1</p></div>
	)
}

ReactDOM.render(<MyNewApp />, document.getElementById("root"))