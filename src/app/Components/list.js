import Item from './item';
import SortOptions from './sortOptions';
import AppHelper from '../other/AppHelper';
import Moment from 'moment';
import Pagination from './pagination';
require('./list.scss');
class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeOption: 'deadline'
    };
  }

  updateActiveOption(value){
    this.setState({activeOption: value});
  }

  getItemsToShow(){
    let items = [];
    if (this.props.items.length == 0) return [];

    for(let item of this.props.items){
      // Check if it's the right category of items that we want to display
      if (this.props.activeCategory.toLowerCase() != 'all'){
        if (item.category.toLowerCase() != this.props.activeCategory.toLowerCase())
          continue;
      }

      items.push(
        <Item id={item.id} text={item.text} deadline={item.deadline} category={item.category} key={item.id} status={item.status}
          categories={this.props.categories}
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
        <div className='col-xs-12 list-container'>
          <h5>Items:</h5>
          <Pagination className="col-xs-12" items={items} itemsPerPage={2}/>
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
  className            : React.PropTypes.string,
  activeCategory       : React.PropTypes.string
};
List.defaultProps = {
  sortOptions          : ['Deadline','Text','Category'],
  items                : [],
  categories           : ['All'],
  deleteItem           : AppHelper.notInitialized,
  editItem             : AppHelper.notInitialized,
  className            : '',
  activeCategory       : 'All'
};
export default List;
