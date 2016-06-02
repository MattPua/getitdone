import Item from './item';
import NewItem from './newItem';
import Filter from './filter';
import SortOptions from './sortOptions';
class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      categories: ['All'],
      activeCategory: 'all',
      activeOption: 'deadline'
    };
  }

  componentDidUpdate(prevProps,prevState){
    window.localStorage.setItem("GetItDone",JSON.stringify(this.state));
  }

  componentDidMount(){
    // Check if LocalStorage "GetItDone" exists, if not , create
    if (window.localStorage.getItem("GetItDone") != null)
      this.refreshItems();
    else
      window.localStorage.setItem("GetItDone",
        JSON.stringify(this.state)
      );
  }

  refreshItems(){
    let localStorage = JSON.parse(window.localStorage.getItem("GetItDone"));

    // TODO: Loop this over elements names
    this.setState({items:  localStorage.items, categories: localStorage.categories });

  }

  deleteItem(id){
    var existingItems = this.state.items;
    var foundItem = $.grep(existingItems,function(e){
      return e.id === id;
    });
    foundItem = foundItem[0];
    existingItems.splice(existingItems.indexOf(foundItem),1);
    this.setState({items:existingItems});
  }

  saveItem(item){
    let oldItems = this.state.items.length > 0 ? this.state.items.slice() : [];
    let newItems = oldItems.concat(item);
    this.setState({items: newItems});
    this.updateCategoriesList(item.category);
  }

  updateCategoriesList(newCategory){
    if (newCategory == '') return;

    let oldCategories = this.state.categories;
    for(let category of oldCategories){
      if (newCategory.toLowerCase() == category.toLowerCase()) return;
    }
    let newCategories = oldCategories.concat(newCategory);
    this.setState({categories: newCategories});
  }

  deleteCategory(category){
    let existingCategories = this.state.categories;
    let foundCategory = $.grep(existingCategories,function(e){
      return e.toLowerCase() == category.toLowerCase();
    });
    foundCategory = foundCategory[0];
    existingCategories.splice(existingCategories.indexOf(foundCategory),1);
    this.setState({categories:existingCategories});

    this.resetCategories(category);
  }

  // Used to reset any items that have a category that was deleted
  resetCategories(category){
    let existingItems = this.state.items;
    for (let item of existingItems){
      if (item.category.toLowerCase() == category.toLowerCase())
        item.category = '';
    }
    this.setState({items: existingItems});
  }

  updateActiveCategory(value){
    this.setState({activeCategory: value});
  }

  updateActiveOption(value){
    this.setState({activeOption: value});
  }

  getItemsToShow(){
    let items = [];
    for(let item of this.state.items){
      // Check if it's the right category of items that we want to display
      if (this.state.activeCategory.toLowerCase() != 'all'){
        if (item.category.toLowerCase() != this.state.activeCategory.toLowerCase())
          continue;
      }

      items.push(
        <Item id={item.id} text={item.text} deadline={item.deadline} category={item.category} key={item.id}
          deleteItem={this.deleteItem.bind(this)}/>
      );
    }
    return items;
  }

  render(){
    let items = this.getItemsToShow();

    return(
      <div className="list">
        <Filter categories={this.state.categories} activeCategory={this.state.activeCategory}
          updateActiveCategory={this.updateActiveCategory.bind(this)}  
          deleteCategory={this.deleteCategory.bind(this)}
        />
{/*        <SortOptions activeOption={this.state.activeOption} sortOptions={this.props.sortOptions} updateActiveOption={this.updateActiveOption.bind(this)} />*/}
        <NewItem saveNewItem={this.saveItem.bind(this)}/>
        {items}
      </div>
    );
  }
}
List.defaultProps = {
  sortOptions: ['Deadline','Text','Category']
}
export default List;
