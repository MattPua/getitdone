import moment from 'moment';
import UUID from 'node-uuid';
import AppHelper from './../other/AppHelper';
import ToggleSectionButton from './toggleSectionButton';
import Item from './item';
import 'eonasdan-bootstrap-datetimepicker';
import './newItem.scss';

class NewItem extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: UUID.v4(),
      text: '',
      category: this.props.categories[0],
      status: 'incomplete',
      showForm: true,
    };
  }

  handleTextChange(event){
    this.setState({text:event.target.value});
  }

  handleCategoryChange(event){
    this.setState({category: event.target.value});
  }

  handleNewItem(event){
    event.preventDefault();
    let deadline = $(this.refs.deadline).val();
    if (this.state.text == '' || deadline == '' || deadline == null) return;

    let item = {
      id: this.state.id,
      text: this.state.text,
      deadline: moment(deadline),
      category: this.state.category,
      status: 'incomplete'
    };


    this.props.saveNewItem(item);
    this.setState({text: '', id: UUID.v4()});
  }

  // Convert the item to a proper JSON format
  static convertToJSON(item){
    let object = item;
    object.deadline = item.deadline.toString();
    return object;
  }

  componentDidMount(){
    $(".new-item .datetimepicker").datetimepicker();
  }

  componentDidUpdate(prevProps,prevState){
    if (!prevState.showForm && this.state.showForm){
      $(".new-item .datetimepicker").datetimepicker();
      $(this.refs.text).focus();
    }
  }

  toggleForm(){
    this.setState({showForm: !this.state.showForm});
  }

  getForm(){
    if (this.state.showForm){
      let categories = [];
      for (let index in this.props.categories){
        categories.push(
          <option value={this.props.categories[index]}>{this.props.categories[index]}</option>
        );
      }
      return(
        <form onSubmit={this.handleNewItem.bind(this)} className='form-inline new-item'>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Task Description" value={this.state.text} onChange={this.handleTextChange.bind(this)} ref="text"/>
          </div>
          <div className="form-group">
            <select className="form-control" onChange={this.handleCategoryChange.bind(this)} value={this.state.category}>
              {categories}
            </select>
          </div>
          <div className="form-group">
            <div className="input-group date datetimepicker">
              <input type="text" className="form-control deadline"  readonly="readonly" placeholder="Deadline" ref="deadline"/>
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>
          <button className="btn" type="submit">Save</button>
        </form>
      );
    }
  }

  render(){
    return(
      <div className={"new-item " + this.props.className}>
        <div className="col-xs-12 new-item-container">
          <span>New Item</span>
          <ToggleSectionButton isShown={this.state.showForm} toggle={this.toggleForm.bind(this)}/>
          <hr/>
          {this.getForm()}
        </div>
      </div>
    );
  }
}

NewItem.defaultProps={
  className   : '',
  categories  : [],
  saveNewItem : AppHelper.notInitialized
};
NewItem.propTypes={
  className   : React.PropTypes.string,
  categories  : React.PropTypes.array.isRequired,
  saveNewItem : React.PropTypes.func.isRequired
};

export default NewItem;