import moment from 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import Helper from '../other/Helper';
import ButtonDropdown from './buttonDropdown';
require('./item.scss');

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      deadline: this.props.deadline,
      category: this.props.category,
      status: this.props.status,
      editMode: false
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.category != this.state.category)
      this.setState({category: newProps.category});
    if (newProps.status != this.state.status)
      this.setState({status: newProps.status});
  }

  componentDidUpdate(prevProps,prevState){
    //TODO: Maybe just compare states?
    if (prevState.status != this.state.status
      || prevState.text != this.state.text 
      || prevState.category != this.state.category
      || prevState.deadline!=this.state.deadline)
      this.props.editItem(this);

    //TODO: Make it possible to only reactivate this one
    if (this.state.editMode)
      $(".item .datetimepicker").datetimepicker();

  }

  toggleEditMode(event){
    event.preventDefault();
    // TODO: This will fail if multiple edit modes are open at once
    this.setState({editMode: !this.state.editMode});
    if (this.state.editMode)
      // TODO: Add check so it doesn't always update
      this.setState({deadline:moment(document.querySelectorAll('.deadline input')[0].value)});
  }

  handleTextChange(event){
    this.setState({text: event.target.value});
  }

  handleCategoryChange(event){
    this.setState({category: event.target.value});
  }

  handleDateChange(event){
  }

  completeItem(event){
    let type =event._targetInst._tag;
    let value = '';
    let newValue = null;
    // get parent
    if (type == 'span')
      //TODO: HACKY
      value = event._targetInst._nativeParent._currentElement.props.value;
    else
      value = event.target.value;
    if (value == 'incomplete')
      newValue = 'complete';
    else
      newValue ='incomplete';
    this.setState({status: newValue});
  }

  getDetailSection(){
    let date = "" + moment(this.state.deadline).calendar(null,{
      nextWeek: '[Next ] dddd [the] Do [at] hh:mm A',
      lastWeek: '[Last] dddd',
      sameElse: 'dddd MMMM Do YYYY [at] hh:mm A'
    });
    let returnValue = [];
    let categories = [];
    for (let index in this.props.categories){
      categories.push(
        <option value={this.props.categories[index]}>{this.props.categories[index]}</option>
        );
    }
    if (this.state.editMode)
      returnValue = [
        <form onSubmit={this.toggleEditMode.bind(this)} className="form-inline">
          <div className="form-group">
            <input type="text" className="text form-control" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
          </div>
          <div className="form-group">
          <select className="form-control" onChange={this.handleCategoryChange.bind(this)} value={this.state.category}>
            {categories}
          </select>
          </div>
          <div className="form-group deadline">
            <div className="input-group date datetimepicker">
              <input type="text" className="form-control"  readonly="readonly" value={moment(this.state.deadline).format('MM/DD/YYYY hh:mm A')} onChange={this.handleDateChange.bind(this)}/>
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>
        </form>
      ];
    else
      returnValue = [
        <span className="text">{this.state.text}</span>,
        <span className="category">{this.state.category}</span>,
        <span className="deadline">{date}</span>
      ];
    return returnValue;
  }

  static isDueOn(date,deadline,type ){
    if (type == null || type == 'undefined' || type == '')
      throw "Invalid type selection provided.";
    if (date == null || date == 'undefined ' || date == '')
      throw "Invalid date provided.";
    if (deadline == null || deadline == 'undefined ' || deadline == '')
      throw "Invalid deadline provided.";
    if (moment(deadline).isSame(moment(date),type) )
      return true;
    return false;
  }
  static isOverdue(date,deadline){
    if (date == null || date == 'undefined ' || date == '')
      throw "Invalid date provided.";
    if (deadline == null || deadline == 'undefined ' || deadline == '')
      throw "Invalid deadline provided.";
    if (moment(deadline).isBefore(moment(date)))
      return true;
    return false;
  }

  getMobileActions(){
    return(
      <div className="btn-group actions mobile-only">
        <button type="button" className="btn primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          &#9776;
           <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
        <li className="complete" onClick={this.completeItem.bind(this)} value={this.state.status}>
          <a href="#"><span className="glyphicon glyphicon-ok"/> Complete</a>
        </li>
        <li className="edit" onClick={this.toggleEditMode.bind(this)}>
          <a href="#"><span className="glyphicon glyphicon-pencil"/> Edit</a>
        </li>
        <li className="delete" onClick={this.props.deleteItem}>
          <a href="#"><span className="glyphicon glyphicon-remove"/> Delete</a>
        </li>
        </ul>
      </div>
    );
  }

  getActions(){
    return(
        <span className="actions">
          <button type="button" className="btn complete" onClick={this.completeItem.bind(this)} value={this.state.status}>
            <span className="glyphicon glyphicon-ok"/>
          </button>
          <button type="button" className="btn edit" onClick={this.toggleEditMode.bind(this)} >
            <span className="glyphicon glyphicon-pencil"/>
          </button>
          <button type="button" className="btn delete " onClick={this.props.deleteItem}>
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </span>

      );
  }

  render(){
    let details = this.getDetailSection();
    let mobileActions = this.getMobileActions();
    let actions = this.getActions();
    return(
      <div className={"item col-xs-12 " + this.state.status}>
        {details}
        {actions}
        {mobileActions}
      </div>
    );
  }
}



Item.defaultProps = {
  id         : null,
  text       : '',
  deadline   : null,
  status     : '',
  categories : [],
  deleteItem : Helper.notInitialized,
  editItem   : Helper.notInitialized
};
Item.propTypes = {
  id         : React.PropTypes.string.isRequired,
  text       : React.PropTypes.string.isRequired,
  deadline   : React.PropTypes.string.isRequired,
  status     : React.PropTypes.string.isRequired,
  categories : React.PropTypes.array.isRequired,
  deleteItem : React.PropTypes.func.isRequired,
  editItem   : React.PropTypes.func.isRequired
};


export default Item;
