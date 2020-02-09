'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);


// class Homepage extends React.Component {
//   render() {
//   	return (
//   		<p>
//   		Hi {this.props.to}
//   		from {this.props.from}
//   		</p>
//     );
//   }
// }

// ReactDOM.render(
//   <Hello to="World" from="Balloonicorn"/>,
//   document.getElementById('root')
// );


// class HelloClicker extends React.Component {
//   alertMessage() {
//     alert('You just handled an event!');
//   }

//   render() {
//     return (
//       <button onClick={this.alertMessage}>
//         Click me
//       </button>
//     );
//   }
// }