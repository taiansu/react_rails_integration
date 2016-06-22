import React from 'react'
var TodoStore = require('../stores/TodoStore')
var Header = require('./Header')
var MainSection = require('./MainSection')

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

const App = React.createClass({
  getInitialState(){
    return getTodoState()
  },
  componentDidMount(){
    TodoStore.addChangeListener(this._onChange)
  },
  componentWillUnmount(){
    TodoStore.removeChangeListener(this._onChange)
  },

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
      </div>
    )
  },
  _onChange() {
    this.setState(getTodoState())
  }
})

export default App
