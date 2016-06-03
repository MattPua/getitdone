import Button from './button';
import moment from 'moment';

require('./item.scss');

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      deadline: this.props.deadline,
      category: this.props.category,
      status: this.props.status,
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.category != this.state.category)
      this.setState({category: newProps.category});
    if (newProps.status != this.state.status)
      this.setState({status: newProps.status});
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.status != this.state.status)
      this.props.completeItem(this);
  }

  editItem(event){

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

  render(){
    let date = "" + moment(this.state.deadline).calendar();

    return(
      <div className={"item col-xs-12 " + this.state.status}>
        <span className="text">{this.state.text}</span>
        <span className="category">{this.state.category}</span>
        <span className="deadline">{date}</span>
        <span className="actions">
          <Button className="btn complete" onClick={this.completeItem.bind(this)} value={this.state.status}>
            <span className="glyphicon glyphicon-ok"/>
          </Button>
          <Button className="btn edit" onClick={this.editItem} >
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
