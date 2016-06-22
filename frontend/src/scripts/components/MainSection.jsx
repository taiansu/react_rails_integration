var React = require('react')
var TodoItem = require('./TodoItem')

var MainSection = React.createClass({
  getTodos(){
    var allTodos = this.props.allTodos;
    var todos = [];
    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }
    return todos
  },

  render(){
    return (<div>
      <ul id="todo-list">{this.getTodos()}</ul>
    </div>)
  },
})

module.exports = MainSection
