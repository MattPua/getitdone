import Button from './button';
import moment from 'moment';

require('./item.scss');

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      deadline: this.props.deadline,
      category: this.props.category
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.category != this.state.category)
      this.setState({category: newProps.category});
  }

  render(){
    let date = "" + moment(this.state.deadline).calendar();

    return(
      <div className="item">
        <span className="actions">
          <Button className="btn delete " onClick={this.props.deleteItem}>
            <span className="glyphicon glyphicon-remove"/>
          </Button>
        </span>
        <span className="text">{this.state.text}</span>
        <span className="category">{this.state.category}</span>
        <span className="deadline">{date}</span>
        <span>{this.props.id}</span>
      </div>
    );
  }
}

export default Item;
