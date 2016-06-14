import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';
import AppHelper from '../other/AppHelper';
import ToggleSectionButton from './ToggleSectionButton';
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
    if (!prevState.showForm && this.state.showForm)
      $(this.refs.category).focus();
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
  toggleShowForm(){
    this.setState({showForm: !this.state.showForm});
  }

  getNewCategory(){
    if (this.state.showForm)
      return(
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Category..." onChange={this.onChange.bind(this)} value={this.state.newCategory} ref="category" />
            <span className="input-group-btn">
              <button className="btn" type="submit" onClick={this.handleOnClick.bind(this)}>Save Category</button>
            </span>
          </div>
        </form>
      );
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
          <ToggleSectionButton isShown={this.state.showForm} toggle={this.toggleShowForm.bind(this)} />
          <hr/>
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