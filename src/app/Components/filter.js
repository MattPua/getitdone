import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';
require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let categories = [];
    return(
      <div className="filter">
        <span>Filter By</span>
        <ButtonDropDown key={UUID.v4()} items={this.props.categories} activeItem={this.props.activeCategory} 
          handleOnClick={this.props.updateActiveCategory}/>
      </div>
    );
  }
}


export default Filter;