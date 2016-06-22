var React = require('react')

var TodoTextInput = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },
  render() {
   return (
    <input
      className={this.props.className}
      id={this.props.id}
      placeholder={this.props.placeholder}
      onBlur={this._save}
      onChange={this._onChange}
      onKeyDown={this._onKeyDown}
      value={this.state.value}
      autoFocus={true}
    />
    );
  },
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },
  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },
})

module.exports = TodoTextInput
