import React from 'react';
require('./button.scss');
require('./colours.scss');

class Button extends React.Component{
  constructor(props){
    super(props);
  }

  handleOnClick(event){
    this.props.handleOnClick(event.target.value);
  }

  render(){
    return(
      <button className={this.props.className + " btn"} onClick={this.handleOnClick.bind(this)} value={this.props.value}>
        {this.props.text}
      </button>);
  }
}

export default Button;