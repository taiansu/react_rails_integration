import React from 'react'
var TodoStore = require('../stores/TodoStore')
var TodoActions = require('../actions/TodoActions')
var Header = require('./Header')
var MainSection = require('./MainSection')

function getTodoState() {
  return {
    isLoading: TodoStore.isLoading(),
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
    TodoActions.queryTodos()
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
        <div id="globalLoading" className={this.state.isLoading ? 'loading' : ''}>
          <div className="spinner spinner--double"></div>
        </div>
      </div>
    )
  },
  _onChange() {
    this.setState(getTodoState())
  }
})

export default App
