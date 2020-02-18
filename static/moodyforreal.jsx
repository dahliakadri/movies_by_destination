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