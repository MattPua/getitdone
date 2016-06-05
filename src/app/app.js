import ReactDOM from 'react-dom';
import Header from './Components/header';
import List from './Components/list';
import Calendar from './Components/calendar';
import './other/general.scss';
import './other/font.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    console.log(window.localStorage.getItem('GetItDone'));
    this.state = {
      items: [],
      categories: ['All']
    }
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

    // TODO: Set timeout to refresh
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

  render(){
    return (
      <div className="container">
        <div className="row">
          <Header className="col-xs-12"/>
          <List className="col-xs-12" items={this.state.items} categories={this.state.categories}
          deleteItem={this.deleteItem.bind(this)}
          editItem={this.editItem.bind(this)}
          saveItem={this.saveItem.bind(this)}
          updateCategoriesList={this.updateCategoriesList.bind(this)}
          deleteCategory={this.deleteCategory.bind(this)}
          />
          <Calendar className="col-xs-12" items={this.state.items}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {};
App.getDefaultProps = {};

ReactDOM.render(<App/>, document.getElementById('app'));