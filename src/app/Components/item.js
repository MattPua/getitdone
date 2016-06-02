import React from 'react';

require('./item.scss');

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      deadline: this.props.deadline,
      category: this.props.category
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.category != this.state.category)
      this.setState({category: newProps.category});
  }
  handleDeleteItem(event){
    this.props.deleteItem(this.props.id);
  }


  render(){
    return(
      <div className="item">
        <span className="actions">
          <button className="delete" onClick={this.handleDeleteItem.bind(this)}>X</button>
        </span>
        <span className="text">{this.state.text}</span>
        <span className="category">{this.state.category}</span>
        <span className="deadline">{this.state.deadline}</span>
        <span>{this.props.id}</span>
      </div>
    );
  }
}

export default Item;
