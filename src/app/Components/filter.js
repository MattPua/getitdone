import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';
import Button from './button';
import ButtonAddons from './buttonAddons';

require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
  }

  handleOnClick(value){
    // Check if value belongs to existing category
    let foundCategory = $.grep(this.props.categories,function(e){
      return value.toLowerCase() == e.toLowerCase();
    });

    // TODO: ALERT MESSAGE
    if (foundCategory.length > 0) return;

    this.props.saveNewCategory(value);
  }

  render(){
    let categories = [];
    return(
      <div className="filter">
        <span>Filter By Category:</span>
        <ButtonDropDown key={UUID.v4()} 
          items={this.props.categories.sort()} 
          activeItem={this.props.activeCategory} 
          handleOnClick={this.props.updateActiveCategory}/>
        <ButtonAddons text="New Category" placeholder="Category..." onClick={this.handleOnClick.bind(this)} />
      </div>
    );
  }
}


export default Filter;