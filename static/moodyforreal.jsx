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
// import React, {Component} from "react"

/**
 * Challenge: Wire up the partially-finished travel form so that it works!
 * Remember to use the concept of controlled forms
 * https://reactjs.org/docs/forms.html
 * 
 * All information should be populating the text below the form in real-time
 * as you're filling it out
 * 
 * This exercise is adapted from the V School curriculum on vanilla JS forms:
 * https://coursework.vschool.io/travel-form/
 * 
 * All of our challenges and learning resources are open for the public
 * to play around with and learn from at https://coursework.vschool.io
 */

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
                    
//                     <select 
//                         value={this.state.destination} 
//                         name="destination" 
//                         onChange={this.handleChange}
//                     >
//                         <option value="">-- Please Choose a destination --</option>
//                         <option value="germany">Germany</option>
//                         <option value="norway">Norway</option>
//                         <option value="north pole">North Pole</option>
//                         <option value="south pole">South Pole</option>
//                     </select>
                    
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
// }
// class MemeGenerator extends Component {
//     constructor() {
//         super()
//         this.state = {
//             topText: "",
//             bottomText: "",
//             randomImg: "http://i.imgflip.com/1bij.jpg",
//             allMemeImgs: []
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
    
//     componentDidMount() {
//         fetch("https://api.imgflip.com/get_memes")
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

const todosData = [
    {
        id: 1,
        text: "USA",
        completed: true
    },
    {
        id: 2,
        text: "Egypt",
        completed: false
    },
    {
        id: 3,
        text: "Ireland",
        completed: false
    }
]

class MoodyApp extends React.Component {
	constructor(){
		super()
		this.state = {
			todos: todosData
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(id) {
		console.log("changed", id)
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

function TodoItem(props) {
    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />
            <p>{props.item.text}</p>
        </div>
    )
}

ReactDOM.render(<MoodyApp />, document.getElementById("root"))