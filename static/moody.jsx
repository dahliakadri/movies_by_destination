// 'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Likeee'
//     );
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);

function Product(props) {
    return(
      <div className="product">
        <h2>{props.product.name}</h2>
        <p>{props.product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        -- {props.product.description}</p>
      </div>)
}

function ToDo(props) {
  return (
      <div className="todo-item">
        <input type="checkbox" checked={props.todo.completed}/>
        <p>{props.todo.test}</p>
      </div>
  )
}