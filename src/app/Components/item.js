import Button from './button';
import moment from 'moment';

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
    if (prevState.status != this.state.status
      || prevState.text != this.state.text 
      || prevState.category != this.state.category)
      this.props.editItem(this);
  }

  toggleEditMode(){
    this.setState({editMode: !this.state.editMode});
  }

  handleTextChange(event){
    this.setState({text: event.target.value});
  }

  handleCategoryChange(event){
    this.setState({category: event.target.value});
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
    let date = "" + moment(this.state.deadline).calendar();
    let returnValue = [];

    if (this.state.editMode)
      returnValue = [
        <input type="text" className="text" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>,
        <input type="text" className="category" value={this.state.category} onChange={this.handleCategoryChange.bind(this)}/>,
        <span className="deadline">{date}</span>
      ];
    else
      returnValue = [
        <span className="text">{this.state.text}</span>,
        <span className="category">{this.state.category}</span>,
        <span className="deadline">{date}</span>
      ];
    return returnValue;
  }

  render(){
    let details = this.getDetailSection();
    return(
      <div className={"item col-xs-12 " + this.state.status}>
        {details}
        <span className="actions">
          <Button className="btn complete" onClick={this.completeItem.bind(this)} value={this.state.status}>
            <span className="glyphicon glyphicon-ok"/>
          </Button>
          <Button className="btn edit" onClick={this.toggleEditMode.bind(this)} >
            <span className="glyphicon glyphicon-pencil"/>
          </Button>
          <Button className="btn delete " onClick={this.props.deleteItem}>
            <span className="glyphicon glyphicon-remove"/>
          </Button>
        </span>
      </div>
    );
  }
}

export default Item;
