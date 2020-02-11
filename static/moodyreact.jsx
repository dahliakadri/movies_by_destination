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
		<div className="main">
			<div className="Joke">
				<Joke
					joke={{question: "Question: Knock Knock?", punchline: "who is there?"}} 
				/>
				<Joke 
					joke={{question: "Question: Hahaha?", punchline: "Hehehe"}} 
				/>
				<Joke
					joke={{punchline: "No questions here hehe"}} 
				 />
				<Joke 
					joke={{question: "Question: Ugh Another Q", punchline: "No more plz"}} 
				/>
				<Joke 
					joke={{punchline: "Another punchline only"}} 
				/>
			</div>
			<div className="contacts">
				<ContactCard 
                	contact={{name: "Mr. Whiskerson", imgUrl: "http://placekitten.com/300/200",
                	phone: "(212) 555-1234",email:"mr.whiskaz@catnap.meow"}}
            	/>
            
           		<ContactCard 
                	contact={{name:"Fluffykins", imgUrl:"http://placekitten.com/400/200",
                	phone:"(212) 555-2345", email:"fluff@me.com"}}
            	/>
            
            	<ContactCard 
                	contact={{name:"Destroyer", imgUrl:"http://placekitten.com/400/300",
                	phone:"(212) 555-3456", email:"ofworlds@yahoo.com"}}
            	/>
            
            	<ContactCard 
                	contact={{name:"Felix", imgUrl:"http://placekitten.com/200/100",
                	phone:"(212) 555-1234", email:"mr.whiskaz@catnap.meow"}}
            	/>
			</div>
			
			<div className="todo-list">
				<ToDoItem />
				<ToDoItem />
				<ToDoItem />
			</div>
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

function ContactCard(props) {
	return(
	<div className="contacts">
                <img src={props.contact.imgUrl}/>
                <h3>{props.contact.name}</h3>
                <p>Phone: {props.contact.phone}</p>
                <p>Email: {props.contact.email}</p>
            </div>)
}

function Joke(props) {
	if (props.joke.question) {
		return(
			<div className="joke">
				<p>{props.joke.question}</p>
				<p>Joke:{props.joke.punchline}</p>
			</div>)
		} else {
			return(
			<div className="joke">
			<p>Joke:{props.joke.punchline}</p>
			</div>)
		}
}

ReactDOM.render(<MyNewApp />, document.getElementById("root"))