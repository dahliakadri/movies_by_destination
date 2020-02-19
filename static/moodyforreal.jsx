// class App extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             todos: todosData
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
    
//     handleChange(id) {
//         this.setState(prevState => {
//             const updatedTodos = prevState.todos.map(todo => {
//                 if (todo.id === id) {
//                     return {
//                         ...todo,
//                         completed: !todo.completed
//                     }
//                 }
//                 return todo
//             })
//             console.log(prevState.todos)
//             console.log(updatedTodos)
//             return {
//                 todos: updatedTodos
//             }
//         })
//     }
    
//     render() {
//         const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
        
//         return (
//             <div className="todo-list">
//                 {todoItems}
//             </div>
//         )    
//     }
// }

// function TodoItem(props) {
//     return (
//         <div className="todo-item">
//             <input 
//                 type="checkbox" 
//                 checked={props.item.completed} 
//                 onChange={() => props.handleChange(props.item.id)}
//             />
//             <p>{props.item.text}</p>
//         </div>
//     )
// }

// class App extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             isLoggedIn: false
//         }
//         this.handleClick = this.handleClick.bind(this)
//     }
    
//     handleClick() {
//         this.setState(prevState => {
//             return {
//                 isLoggedIn: !prevState.isLoggedIn
//             }
//         })
//     }
    
//     render() {   
//         let buttonText = this.state.isLoggedIn ? "LOG OUT" : "LOG IN"
//         let displayText = this.state.isLoggedIn ? "Logged in" : "Logged out"
//         return (
//             <div>
//                 <button onClick={this.handleClick}>{buttonText}</button>
//                 <h1>{displayText}</h1>
//             </div>
//         )
//     }
// }
// import React, {Component} from "react"

// // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// // https://swapi.co/
// // https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             loading: false,
//             character: {}
//         }
//     }
    
//     componentDidMount() {
//         this.setState({loading: true})
//         fetch("https://swapi.co/api/people/1")
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({
//                     loading: false,
//                     character: data
//                 })
//             })
//     }
    
//     render() {
//         const text = this.state.loading ? "loading..." : this.state.character.name
//         return (
//             <div>
//                 <p>{text}</p>
//             </div>
//         )
//     }
// }

// export default App
// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             firstName: "",
//             lastName: "",
//             isFriendly: false,
//             gender: "",
//             favColor: "blue"
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
    
//     handleChange(event) {
//         const {name, value, type, checked} = event.target
//         type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
//     }
    
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <input 
//                     type="text" 
//                     value={this.state.firstName} 
//                     name="firstName" 
//                     placeholder="First Name" 
//                     onChange={this.handleChange} 
//                 />
//                 <br />
//                 <input 
//                     type="text" 
//                     value={this.state.lastName} 
//                     name="lastName" 
//                     placeholder="Last Name" 
//                     onChange={this.handleChange} 
//                 />
                
//                 {
//                     /**
//                      * Other useful form elements:
//                      * 
//                      *  <textarea /> element
//                      *  <input type="checkbox" />
//                      *  <input type="radio" />
//                      *  <select> and <option> elements
//                      */
//                 }
                
//                 <textarea 
//                     value={"Some default value"}
//                     onChange={this.handleChange}
//                 />
                
//                 <br />
                
//                 <label>
//                     <input 
//                         type="checkbox" 
//                         name="isFriendly"
//                         checked={this.state.isFriendly}
//                         onChange={this.handleChange}
//                     /> Is friendly?
//                 </label>
//                 <br />
//                 <label>
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="male"
//                         checked={this.state.gender === "male"}
//                         onChange={this.handleChange}
//                     /> Male
//                 </label>
//                 <br />
//                 <label>
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="female"
//                         checked={this.state.gender === "female"}
//                         onChange={this.handleChange}
//                     /> Female
//                 </label>
//                 {/* Formik */}
//                 <br />
                
//                 <label>Favorite Color:</label>
//                 <select 
//                     value={this.state.favColor}
//                     onChange={this.handleChange}
//                     name="favColor"
//                 >
//                     <option value="blue">Blue</option>
//                     <option value="green">Green</option>
//                     <option value="red">Red</option>
//                     <option value="orange">Orange</option>
//                     <option value="yellow">Yellow</option>
//                 </select>
                
//                 <h1>{this.state.firstName} {this.state.lastName}</h1>
//                 <h2>You are a {this.state.gender}</h2>
//                 <h2>Your favorite color is {this.state.favColor}</h2>
//                 <button>Submit</button>
//             </form>
//         )
//     }
// }

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             firstName: "",
//             lastName: "",
//             age: "",
//             gender: "",
//             destination: "",
//             isVegan: false,
//             isKosher: false,
//             isLactoseFree: false
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
    
//     handleChange(event) {
//         const {name, value, type, checked} = event.target
//         type === "checkbox" ? 
//             this.setState({
//                 [name]: checked
//             })
//         :
//         this.setState({
//             [name]: value
//         }) 
//     }
    
//     render() {
//         return (
//             <main>
//                 <form>
//                     <input 
//                         name="firstName" 
//                         value={this.state.firstName} 
//                         onChange={this.handleChange} 
//                         placeholder="First Name" 
//                     />
//                     <br />
                    
//                     <input 
//                         name="lastName" 
//                         value={this.state.lastName}
//                         onChange={this.handleChange} 
//                         placeholder="Last Name" 
//                     />
//                     <br />
                    
//                     <input 
//                         name="age" 
//                         value={this.state.age}
//                         onChange={this.handleChange} 
//                         placeholder="Age" 
//                     />
//                     <br />
                    
//                     <label>
//                         <input 
//                             type="radio" 
//                             name="gender"
//                             value="male"
//                             checked={this.state.gender === "male"}
//                             onChange={this.handleChange}
//                         /> Male
//                     </label>
                    
//                     <br />
                    
//                     <label>
//                         <input 
//                             type="radio" 
//                             name="gender"
//                             value="female"
//                             checked={this.state.gender === "female"}
//                             onChange={this.handleChange}
//                         /> Female
//                     </label>
                    
//                     <br />
                    
                    // <select 
                    //     value={this.state.destination} 
                    //     name="destination" 
                    //     onChange={this.handleChange}>
                    //     <option value="">-- Please Choose a destination --</option>
                    //     <option value="germany">Germany</option>
                    //     <option value="norway">Norway</option>
                    //     <option value="north pole">North Pole</option>
                    //     <option value="south pole">South Pole</option>
                    // </select>
                    
//                     <br />
                    
//                     <label>
//                         <input 
//                             type="checkbox"
//                             name="isVegan"
//                             onChange={this.handleChange}
//                             checked={this.state.isVegan}
//                         /> Vegan?
//                     </label>
//                     <br />
                    
//                     <label>
//                         <input 
//                             type="checkbox"
//                             name="isKosher"
//                             onChange={this.handleChange}
//                             checked={this.state.isKosher}
//                         /> Kosher?
//                     </label>
//                     <br />
                    
//                     <label>
//                         <input 
//                             type="checkbox"
//                             name="isLactoseFree"
//                             onChange={this.handleChange}
//                             checked={this.state.isLactoseFree}
//                         /> Lactose Free?
//                     </label>
//                     <br />
                    
//                     <button>Submit</button>
//                 </form>
//                 <hr />
//                 <h2>Entered information:</h2>
//                 <p>Your name: {this.state.firstName} {this.state.lastName}</p>
//                 <p>Your age: {this.state.age}</p>
//                 <p>Your gender: {this.state.gender}</p>
//                 <p>Your destination: {this.state.destination}</p>
//                 <p>Your dietary restrictions:</p>
                
//                 <p>Vegan: {this.state.isVegan ? "Yes" : "No"}</p>
//                 <p>Kosher: {this.state.isKosher ? "Yes" : "No"}</p>
//                 <p>Lactose Free: {this.state.isLactoseFree ? "Yes" : "No"}</p>
                
//             </main>
//         )
//     }
// // }
// class App extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             allcountries: []
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
    
//     componentDidMount() {
//         fetch("/")
//             .then(response => response.json())
//             .then(response => {
//                 const {memes} = response.data
//                 this.setState({ allMemeImgs: memes })
//             })
//     }
    
//     handleChange(event) {
//         const {name, value} = event.target
//         this.setState({ [name]: value })
//     }
    
//     handleSubmit(event) {
//         event.preventDefault()
//         const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
//         const randMemeImg = this.state.allMemeImgs[randNum].url
//         this.setState({ randomImg: randMemeImg })
//     }
    
//     render() {
//         return (
//             <div>
//                 <form className="meme-form" onSubmit={this.handleSubmit}>
//                     <input 
//                         type="text"
//                         name="topText"
//                         placeholder="Top Text"
//                         value={this.state.topText}
//                         onChange={this.handleChange}
//                     /> 
//                     <input 
//                         type="text"
//                         name="bottomText"
//                         placeholder="Bottom Text"
//                         value={this.state.bottomText}
//                         onChange={this.handleChange}
//                     /> 
                
//                     <button>Gen</button>
//                 </form>
//                 <div className="meme">
//                     <img src={this.state.randomImg} alt="" />
//                     <h2 className="top">{this.state.topText}</h2>
//                     <h2 className="bottom">{this.state.bottomText}</h2>
//                 </div>
//             </div>
//         )
//     }
// }

// https://medium.freecodecamp.org/every-time-you-build-a-to-do-list-app-a-puppy-dies-505b54637a5d

// https://medium.freecodecamp.org/want-to-build-something-fun-heres-a-list-of-sample-web-app-ideas-b991bce0ed9a

// https://medium.freecodecamp.org/summer-is-over-you-should-be-coding-heres-yet-another-list-of-exciting-ideas-to-build-a95d7704d36d

// const todosData = [
//     {
//         id: 1,
//         text: "USA",
//         completed: true
//     },
//     {
//         id: 2,
//         text: "Egypt",
//         completed: false
//     },
//     {
//         id: 3,
//         text: "Ireland",
//         completed: false
//     }
// ]

// class MoodyApp extends React.Component {
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		todos: todosData
	// 	}
	// 	this.handleChange = this.handleChange.bind(this)
	// }

	// handleChange(id) {
	// 	console.log("changed", id)
	// }
	// render() {
	// 	return (
	// 		<div>
	// 			<h1>Is state important to know? {this.state.answer}</h1>
	// 			<Header username="vschool"/>
	// 			<MainContent answer={this.state.answer}/>
	// 			<Footer />
	// 		</div>)
	// }
// }

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

// class MainContent extends React.Component{
// 	render() {
// 		const maintest = "test 123 main"
// 		return(
// 			<h3> This is a test: {maintest} and {this.props.answer}.</h3>)
// 	}
// }

// class Footer extends React.Component{
// 	render(){
// 		const footertest = "test123 footer"
// 		return (
// 			<div>Moody Since 2020 another test: {footertest}</div>)
// 	}
// }

// function TodoItem(props) {
//     return (
//         <div className="todo-item">
//             <input 
//                 type="checkbox" 
//                 checked={props.item.completed} 
//                 onChange={() => props.handleChange(props.item.id)}
//             />
//             <p>{props.item.text}</p>
//         </div>
//     )
// }

// ReactDOM.render(<MoodyApp />, document.getElementById("root"))


class App extends React.Component {
  constructor() {
    super()
    this.state = {allcountries: [],
                  loading: false,
                  destination: ""}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({loading : true})
    fetch("/cards.json")
            .then(response => response.json())
            .then(response => {
                const {countries} = response.countries
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
    const text = this.state.loading ? "loading..." : "loaded"

    return (
      <div>
        {text}
        Choose your destination:
        <form className="country-form" onSubmit={this.handleSubmit}>
          <select value={this.state.selectcountry}
                  name="destination"
                  onChange={this.handleChange}>
                  <option value="">-- Please Choose a destination --</option>
                  <option value="germany">Germany</option>
                  <option value="norway">Norway</option>
                  <option value="north pole">North Pole</option>
                  <option value="south pole">South Pole</option>
                  </select>
      </div>
    );
  }
}

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
    const date = new Da
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
    const todoComponents = todosData.map(item => <ToDo key={item.id} todo={item}/>)
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

ReactDOM.render(<App />, document.getElementById('container'));