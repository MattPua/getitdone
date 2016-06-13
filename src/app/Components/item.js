import moment from 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import AppHelper from '../other/AppHelper';
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

    if (this.state.editMode)
      $(this.refs.datetimepicker).datetimepicker();

  }

  toggleEditMode(event){
    event.preventDefault();
    this.setState({editMode: !this.state.editMode});
    if (this.state.editMode)
      // TODO: Add check so it doesn't always update
      this.setState({deadline:moment(this.refs.inputDeadline.value)});
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

  deleteItem(event){
    event.preventDefault();
    let type = event._targetInst._tag;
    let value = '';
    // get parent
    if (type == 'span' || type =='a'){
      //TODO: HACKY
      value = event._targetInst._nativeParent._currentElement.props.value;
    }
    else
      value = event.target.value;
    this.props.deleteItem(value);
  }

  getMobileActions(){
    return(
      <div className="btn-group">
        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          &#9776;
           <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
        <li className="complete" onClick={this.completeItem.bind(this)} >
          <a href="#" value={this.state.status}><span className="glyphicon glyphicon-ok"/> Complete</a>
        </li>
        <li className="edit" onClick={this.toggleEditMode.bind(this)}>
          <a href="#"><span className="glyphicon glyphicon-pencil"/> Edit</a>
        </li>
        <li className="delete" onClick={this.deleteItem.bind(this)} value={this.props.id}>
          <a href="#" value={this.props.id}><span className="glyphicon glyphicon-remove"/> Delete</a>
        </li>
        </ul>
      </div>
    );
  }

  getActions(){
    return(
      <span className="actions col-xs-3">
{/*        <div className="standard">
          <button type="button" className="btn complete" onClick={this.completeItem.bind(this)} value={this.state.status}>
            <span className="glyphicon glyphicon-ok"/>
          </button>
          <button type="button" className="btn edit" onClick={this.toggleEditMode.bind(this)} >
            <span className="glyphicon glyphicon-pencil"/>
          </button>
          <button type="button" className="btn delete " onClick={this.deleteItem.bind(this)}  value={this.props.id}>
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </div>*/}
        {this.getMobileActions()}
      </span>
    );
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
        <form onSubmit={this.toggleEditMode.bind(this)} className="form-inline col-xs-9">
          <div className="form-group">
            <input type="text" className="text form-control" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
          </div>
          <div className="form-group">
          <select className="form-control" onChange={this.handleCategoryChange.bind(this)} value={this.state.category}>
            {categories}
          </select>
          </div>
          <div className="form-group">
            <div className="input-group date datetimepicker" ref="datetimepicker">
              <input type="text" className="form-control deadline" ref='inputDeadline' readonly="readonly" value={moment(this.state.deadline).format('MM/DD/YYYY hh:mm A')} onChange={this.handleDateChange.bind(this)}/>
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>
        </form>
      ];
    else
      returnValue = (
        <div className="col-xs-9 details">
          <span className="text">{this.state.text}</span>
        </div>
      );
    return returnValue;
  }
  getTags(){
    // TODO: future multiple tags/categories
    return(
      <div className="tab">
        {this.state.category}
      </div>
    );
  }

  render(){
    let details = this.getDetailSection();
    let actions = this.getActions();
    let date = "" + moment(this.state.deadline).calendar(null,{
      nextWeek: '[Next ] dddd [the] Do [at] hh:mm A',
      lastWeek: '[Last] dddd',
      sameElse: 'dddd MMMM Do YYYY [at] hh:mm A'
    });
    return(
      <div className={"item " + this.props.className + " " + this.state.status}>
        <div className="tab-container row">
          {this.getTags()}
        </div>
        <div className="detail-container row">
          {details}
          {actions}
        </div>
        <div className="deadline row">
          <p className="col-xs-12">Due: {date}</p>
        </div>
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
  deleteItem : AppHelper.notInitialized,
  editItem   : AppHelper.notInitialized,
  className  : ""
};
Item.propTypes = {
  id         : React.PropTypes.string.isRequired,
  text       : React.PropTypes.string.isRequired,
  deadline   : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
  status     : React.PropTypes.string.isRequired,
  categories : React.PropTypes.array.isRequired,
  deleteItem : React.PropTypes.func.isRequired,
  editItem   : React.PropTypes.func.isRequired
};


export default Item;
