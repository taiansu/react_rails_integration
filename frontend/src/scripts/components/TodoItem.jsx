var React = require('react');
var classNames = require('classnames');
var TodoTextInput = require('./TodoTextInput');
var TodoActions = require('../actions/TodoActions.js')

var TodoItem = React.createClass({
  getInitialState() {
    return { isEditing: false }
  },

  inputEl(text){
    return this.state.isEditing ? (
        <TodoTextInput
          type="text"
          className="edit"
          onSave={this._onSave}
          value={text}
        />
      ) : null
  },

  render(){
    var {complete, text} = this.props.todo

    return (
      <li className={classNames({
          'completed': complete,
          'editing': this.state.isEditing
        })}>
        <div onDoubleClick={this._onDoubleClick}>
          {text}
        </div>
        {this.inputEl(text)}
      </li>
    )
  },

  _onDoubleClick(){
    this.setState({isEditing: true})
  },
  _onSave(text){
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  }
})

module.exports = TodoItem
