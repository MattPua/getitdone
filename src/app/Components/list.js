import Item from './item';
import NewItem from './newItem';
import Filter from './filter';
import SortOptions from './sortOptions';
import Helper from '../other/helper';
import UUID from 'node-uuid';
require('./list.scss');
class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeCategory: 'all',
      activeOption: 'deadline'
    };
  }

  updateActiveCategory(value){
    this.setState({activeCategory: value});
  }

  updateActiveOption(value){
    this.setState({activeOption: value});
  }

  getItemsToShow(){
    let items = [];
    if (this.props.items.length == 0) return [];

    for(let item of this.props.items){
      // Check if it's the right category of items that we want to display
      if (this.state.activeCategory.toLowerCase() != 'all'){
        if (item.category.toLowerCase() != this.state.activeCategory.toLowerCase())
          continue;
      }

      items.push(
        <Item id={item.id} text={item.text} deadline={item.deadline} category={item.category} key={item.id} status={item.status}
          categories={this.state.categories}
          deleteItem={this.props.deleteItem}
          editItem={this.props.editItem}
        />
      );
    }

    return items;
  }

  render(){
    let items = this.getItemsToShow();
    return(
      <div className={"list " + this.props.className}>
        <div className="options-container col-xs-12">
          <Filter categories={this.props.categories} activeCategory={this.state.activeCategory}
              updateActiveCategory={this.updateActiveCategory.bind(this)}  
              deleteCategory={this.props.deleteCategory}
              saveNewCategory={this.props.updateCategoriesList}
            />
{/*        <SortOptions activeOption={this.state.activeOption} sortOptions={this.props.sortOptions} updateActiveOption={this.updateActiveOption.bind(this)} />*/}
          <NewItem key={UUID.v4()} saveNewItem={this.props.saveItem} categories={this.props.categories}/>
        </div>
        <div className='col-xs-12 item-container'>
          {"There are " + items.length + " things to do"}
          <hr/>
          {items.length > 0 ? items : "Everything's done!"}
          
        </div>
      </div>
    );
  }
}
List.propTypes = {
  sortOptions          : React.PropTypes.array,
  items                : React.PropTypes.array.isRequired,
  categories           : React.PropTypes.array.isRequired,
  deleteItem           : React.PropTypes.func.isRequired,
  editItem             : React.PropTypes.func.isRequired,
  saveItem             : React.PropTypes.func.isRequired,
  updateCategoriesList : React.PropTypes.func.isRequired,
  deleteCategory       : React.PropTypes.func.isRequired,
  className            : React.PropTypes.string,
};
List.defaultProps = {
  sortOptions          : ['Deadline','Text','Category'],
  items                : [],
  categories           : ['All'],
  deleteItem           : Helper.notInitialized,
  editItem             : Helper.notInitialized,
  saveItem             : Helper.notInitialized,
  updateCategoriesList : Helper.notInitialized,
  deleteCategory       : Helper.notInitialized,
  className            : ''
};
export default List;
