import Item from './item';
import SortOptions from './sortOptions';
import AppHelper from '../other/AppHelper';
import Moment from 'moment';
import Pagination from './pagination';
import ToggleSectionButton from './toggleSectionButton';
require('./list.scss');
class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeOption: 'deadline',
      showList: true,
    }
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
        <Item className="col-xs-12 col-sm-6" id={item.id} text={item.text} deadline={item.deadline} category={item.category} key={item.id} status={item.status}
          categories={this.props.categories}
          deleteItem={this.props.deleteItem}
          editItem={this.props.editItem}
        />
      );
    }

    return items;
  }

  toggleList(){
    this.setState({showList: !this.state.showList});
  }

  showList(){
    let items = this.getItemsToShow();
    let text = items.length > 0 ? "" : "Everything's done!";
    if (this.state.showList){
      return[
        <p>{items.length > 0 ? "" : "Everything's done!"}</p>,
        <Pagination className="col-xs-12" items={items} itemsPerPage={this.props.itemsPerPage} currentPage={this.props.currentPage}
          changeNumberItemsPerPage={this.props.changeNumberItemsPerPage}
          updateCurrentPage={this.props.updateCurrentPage}
        />
      ];
    }
    else
      return '';
  }
  render(){
    return(
      <div className={"list " + this.props.className}>
        <div className='col-xs-12 list-container'>
          <ToggleSectionButton isShown={this.state.showList} toggle={this.toggleList.bind(this)}/>
          <h5>Items:</h5>
          <hr/>
          {this.showList()}
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
  activeCategory       : React.PropTypes.string,
  currentPage          : React.PropTypes.number.isRequired 
};
List.defaultProps = {
  sortOptions          : ['Deadline','Text','Category'],
  items                : [],
  categories           : ['All'],
  deleteItem           : AppHelper.notInitialized,
  editItem             : AppHelper.notInitialized,
  className            : '',
  activeCategory       : 'All',
  currentPage          : 1
};
export default List;
