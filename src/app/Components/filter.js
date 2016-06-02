import React from 'react';
import UUID from 'node-uuid';
import Button from './button';
require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
  }

  changeActiveFilter(value){
    if (this.props.activeCategory.toLowerCase() == value.toLowerCase()) return;

    this.props.updateActiveCategory(value);
  }

  render(){
    let categories = [];
    for (let category of this.props.categories){
      let className = "";
      if (category.toLowerCase() == this.props.activeCategory.toLowerCase()) className="active";
      categories.push(
        <Button key={UUID.v4()} className={className} text={category} value={category} handleOnClick={this.changeActiveFilter.bind(this)}/>
        );
    }

    return(
      <div className="filter">
        {categories}
      </div>
    );
  }
}


export default Filter;