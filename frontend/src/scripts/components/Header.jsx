var React = require('react')
var TodoActions = require('../actions/TodoActions')
var TodoTextInput = require('./TodoTextInput')

var Header = React.createClass({
  render: function() {
    return (
      <header id="header">
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    )
  },

  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }
})

module.exports = Header
