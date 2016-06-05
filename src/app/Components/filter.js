import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';

require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newCategory: ''
    };
  }

  onChange(event){
    this.setState({newCategory: event.target.value});
  }

  handleOnClick(){
    var newCategory = this.state.newCategory;
    // Check if value belongs to existing category
    let foundCategory = $.grep(this.props.categories,function(e){
      return newCategory.toLowerCase() == e.toLowerCase();
    });

    // TODO: ALERT MESSAGE
    if (foundCategory.length > 0) return;

    this.props.saveNewCategory(newCategory);

    this.setState({newCategory: ''});
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
          <form TODO>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Category..." onChange={this.onChange.bind(this)} value={this.state.newCategory} />
              <span className="input-group-btn">
                <button className="btn" type="button" onClick={this.handleOnClick.bind(this)}>New Category...</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default Filter;