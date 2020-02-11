'use strict';

const products = [
    {
        id: "1",
        name: "Pencil",
        price: 1,
        description: "Perfect for those who can't remember things! 5/5 Highly recommend."
    },
    {
        id: "2",
        name: "Housing",
        price: 0,
        description: "Housing provided for out-of-state students or those who can't commute"
    },
    {
        id: "3",
        name: "Computer Rental",
        price: 300,
        description: "Don't have a computer? No problem!"
    },
    {
        id: "4",
        name: "Coffee",
        price: 2,
        description: "Wake up!"
    },
    {
        id: "5",
        name: "Snacks",
        price: 0,
        description: "Free snacks!"
    },
    {
        id: "6",
        name: "Rubber Duckies",
        price: 3.50,
        description: "To help you solve your hardest coding problems."
    },
    {
        id: "7",
        name: "Fidget Spinner",
        price: 21.99,
        description: "Because we like to pretend we're in high school."
    },
    {
        id: "8",
        name: "Sticker Set",
        price: 14.99,
        description: "To prove to other devs you know a lot."
    }
]

const todosData = [
    {
        id: 1,
        text: "Take out the trash",
        completed: true
    },
    {
        id: 2,
        text: "Grocery shopping",
        completed: false
    },
    {
        id: 3,
        text: "Clean gecko tank",
        completed: false
    },
    {
        id: 4,
        text: "Mow lawn",
        completed: true
    },
    {
        id: 5,
        text: "Catch up on Arrested Development",
        completed: false
    }
]

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
	const productComponents = products.map(item => <Product key={item.id} product={item}/>)
	const todoComponents = todosData.map(item => <ToDo key={item.id} todo={item} />)
	return(
		<div className="main">
			<div className="product">
				{productComponents}
			</div>

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
			
			<div className="todolist">
				return {todoComponents} 
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

function ToDo(props) {
	return (
			<div className="todo-item">
				<input type="checkbox" checked={props.todo.completed}/>
				<p>{props.todo.text}</p>
			</div>
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
			<p style={{color:"red"}}>Joke:{props.joke.punchline}</p>
			</div>)
		}
}


function Product(props) {
		return(
			<div className="product">
				<h2>{props.product.name}</h2>
				<p>{props.product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
				-- {props.product.description}</p>
			</div>)
}

ReactDOM.render(<MyNewApp />, document.getElementById("root"))