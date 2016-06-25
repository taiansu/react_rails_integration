var AppDispatcher = require('../dispatcher/AppDispatcher')
var TodoConstants = require('../constants/TodoConstants')

var $ = require('jquery')
var BASE_URI = 'http://localhost:3000/api/v1'

function todoItem(json){
  var key = `${json.type}${json.id}`

  var value = {
    id: json.id,
    text: json.attributes.text,
    complete: json.attributes.complete
  }

  return {[key]: value} // es6: variable as object key
}

function formatTodosResp(resp) {
  let todos = {}
  if (resp.data.length > 0) {
    resp.data.forEach(todo => {
      todos = Object.assign(todos, todoItem(todo))
    })
  }
  return todos
}

function formatTodoRequest(text){
  return JSON.stringify({
    "data": {
      "type": "todos",
      "attributes": {
        "text": text,
        "complete": false
      }
    }
  })
}

var TodoActions = {
  create(text) {
    if (!text.trim()) { return }

    this.toggleLoading()

    $.ajax({
      url: `${BASE_URI}/todos`,
      type: 'POST',
      contentType: 'application/vnd.api+json',
      data: formatTodoRequest(text)
    })
    .then(resp => {
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_CREATE,
        todo: todoItem(resp.data)
      })
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
