import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';
import AppHelper from '../other/AppHelper';
require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newCategory: '',
      showForm: false
    };
  }

  onChange(event){
    event.preventDefault();
    this.setState({newCategory: event.target.value});
  }

  componentDidUpdate(prevProps,prevState){
    // TODO: Add animations for changing
  }

  handleOnClick(){

    var newCategory = this.state.newCategory;
    if (newCategory == null || newCategory == '') return;

    // Check if value belongs to existing category
    let foundCategory = $.grep(this.props.categories,function(e){
      return newCategory.toLowerCase() == e.toLowerCase();
    });

    // TODO: ALERT MESSAGE
    if (foundCategory.length > 0) return;

    this.props.saveNewCategory(newCategory);

    this.setState({newCategory: '',showForm: false});
  }

  handleSubmit(event){
    event.preventDefault();
    this.handleOnClick();
  }
  triggerShowForm(){
    this.setState({showForm: true});
  }

  closeForm(){
    this.setState({showForm: false});
  }

  getNewCategory(){
    if (this.state.showForm)
      return[
        <button className="btn" type="button" onClick={this.closeForm.bind(this)}>
          <span className="glyphicon glyphicon-minus"/>
        </button>,
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Category..." onChange={this.onChange.bind(this)} value={this.state.newCategory} />
            <span className="input-group-btn">
              <button className="btn" type="submit" onClick={this.handleOnClick.bind(this)}>Save Category</button>
            </span>
          </div>
        </form>
      ];
    else{


      return(
        <button className="btn" type="button" onClick={this.triggerShowForm.bind(this)}>
          <span className="glyphicon glyphicon-plus"/>
        </button>
      );
    }
  }

  render(){
    let categories = [];
    return(
      <div className={"filter " + this.props.className}>
        <div className="col-xs-12 filter-container">
          <span>Filter By Category:</span>
          <ButtonDropDown key={UUID.v4()} 
            items={this.props.categories.sort()} 
            activeItem={this.props.activeCategory} 
            handleOnClick={this.props.updateActiveCategory}/>
          {this.getNewCategory()}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  categories           : React.PropTypes.array.isRequired,
  activeCategory       : React.PropTypes.string.isRequired,
  className            : React.PropTypes.string,
  updateActiveCategory : React.PropTypes.func.isRequired,
  deleteCategory       : React.PropTypes.func.isRequired,
  saveNewCategory      : React.PropTypes.func.isRequired
};
Filter.defaultProps = {
  categories           : [],
  activeCategory       : 'All',
  className            : '',
  updateActiveCategory : AppHelper.notInitialized,
  deleteCategory       : AppHelper.notInitialized,
  saveNewCategory      : AppHelper.notInitialized
};

export default Filter;