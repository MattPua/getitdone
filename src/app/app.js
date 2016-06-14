import ReactDOM from 'react-dom';
import Header from './Components/header';
import List from './Components/list';
import Calendar from './Components/calendar';
import Filter from './Components/filter';
import NewItem from './Components/newItem';
import Summary from './Components/summary';
import ExternalScripts from './Components/externalScripts';
import StorageWrapper from './other/storageWrapper';
import C from './other/_constants';
import './other/main.scss';
import './app.scss';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeCategory: 'all',
      items: [],
      categories: ['All'],
      currentPage: 1,
      itemsPerPage: 4,
      fileStorageType: C.FileStorageType.CACHE,
    };
  }

  componentDidUpdate(prevProps,prevState){
    StorageWrapper.saveData(this.state.fileStorageType,this.state);
  }

  componentDidMount(){
    this.getInitialData();
    // TODO: Set timeout to refresh
  }

  getInitialData(){
    let callback = null;
    if (this.state.fileStorageType == C.FileStorageType.CACHE){
      // TODO: Loop this over elements names
      callback = (function(data){
        this.setState({items:  data.items, categories: data.categories })
      }).bind(this);
    }
    let data = StorageWrapper.getInitialData(this.  state.fileStorageType,this.state,callback);
  }

  updateActiveCategory(value){
    this.setState({activeCategory: value,currentPage: 1});
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

  editItem(item){
    var existingItems = this.state.items;
    var foundItem = $.grep(existingItems,function(e){
      return e.id === item.props.id;
    });
    foundItem = foundItem[0];
    existingItems[existingItems.indexOf(foundItem)] = item.state;
    this.setState({items: existingItems});
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

  updateCurrentPage(value){
    this.setState({currentPage: value});
  }

  changeNumberItemsPerPage(value){
    this.setState({itemsPerPage: value});
  }

  render(){
    return (
      <div className="app-container">
        <div className="container">
          <div className="row">
            <br/>
            <Summary items={this.state.items} className="col-xs-12" categories={this.state.categories}
            deleteItem={this.deleteItem.bind(this)}
            editItem={this.editItem.bind(this)} />
            <NewItem className="col-xs-12" saveNewItem={this.saveItem.bind(this)} categories={this.state.categories}/>
            <Filter categories={this.state.categories} activeCategory={this.state.activeCategory} className="col-xs-12"
                updateActiveCategory={this.updateActiveCategory.bind(this)}  
                deleteCategory={this.deleteCategory.bind(this)}
                saveNewCategory={this.updateCategoriesList.bind(this)}
              />
            <List className="col-xs-12 col-md-12" items={this.state.items} categories={this.state.categories} activeCategory={this.state.activeCategory} currentPage={this.state.currentPage} itemsPerPage={this.state.itemsPerPage}
            changeNumberItemsPerPage={this.changeNumberItemsPerPage.bind(this)}
            updateCurrentPage={this.updateCurrentPage.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
            editItem={this.editItem.bind(this)}
            saveItem={this.saveItem.bind(this)}
            />
            <Calendar className="col-xs-12" items={this.state.items} activeCategory={this.state.activeCategory}/>
          </div>
        </div>
        <ExternalScripts/>
      </div>

    );
  }
}

App.propTypes = {};
App.getDefaultProps = {};

ReactDOM.render(<App/>, document.getElementById('app'));