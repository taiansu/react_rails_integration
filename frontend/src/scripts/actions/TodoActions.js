var AppDispatcher = require('../dispatcher/AppDispatcher')
var TodoConstants = require('../constants/TodoConstants')

var TodoActions = {
  create(text) {
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
  }

}

module.exports = TodoActions
