var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants')

var CHANGE_EVENT = 'change';

// 資料本體
var _todos = {
  "todo1": {id: "todo1", text: 'My todo'},
};

var _isLoading = false


// 操作資料本體的函式
function create (text){
  var id = _randomId();

  _todos[id] = {
    id: id,
    text: text,
    complete: false
  }
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
}

// 對 View(Component) 公開的函式
var TodoStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return _todos;
  },
  areAllComplete() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },
  isLoading(){
    return _isLoading
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
// 拿資料的函式
})

//巨大的 switch/case
AppDispatcher.register(function(action){
  switch(action.actionType){
    case TodoConstants.TODO_CREATE:
      var text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      var text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_LOADING:
      _isLoading = !_isLoading
      TodoStore.emitChange();
      break;

    default:
      console.log('can not found actionType: ' + action.actionType)
  }
})

function _randomId(){
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

module.exports = TodoStore
