var AppDispatcher = require('../dispatcher/AppDispatcher')
var TodoConstants = require('../constants/TodoConstants')

var $ = require('jquery')
var BASE_URI = 'http://localhost:3000/api/v1'

function formatTodosResp(resp) {
  let todos = {}
  if (resp.data.length > 0) {
    resp.data.forEach(todo => {
      todos[`${todo.type}${todo.id}`] = {
        id: todo.id,
        text: todo.attributes.text,
        complete: todo.attributes.complete
      }
    })
  }
  return todos
}

var TodoActions = {
  create(text) {
    this.toggleLoading()

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    })
  },

  updateText(id, text){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    })
  },

  toggleLoading(){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_LOADING,
    })
  },

  queryTodos(){
    this.toggleLoading()

    $.get(`${BASE_URI}/todos`)
     .then(resp => {
       let todos = formatTodosResp(resp)
       AppDispatcher.dispatch({
         actionType: TodoConstants.TODO_FETCHED,
         todos: todos
       })
     })
  },

}

module.exports = TodoActions
